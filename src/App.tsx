// External Library
import { useMemo } from "react";

// Components
import Header from "@components/structure/Header";
import Footer from "@components/structure/Footer";
import CardsGrid from "@components/commons/cards/CardGrid";
import ArenaView from "@components/structure/AreaView";

// Static Data Content
import { deckContent } from "@assets/content/deck";
import { areaContent } from "@assets/content/arena";
import { winnerContent } from "@assets/content/winner";

// Types
import type { Attrs, Card } from "_types/arena";

export default function App() {
  const deckA = deckContent.firstPlayer;
  const deckB = deckContent.secondPlayer;
  const arena = areaContent[0] || null;
  const winners = winnerContent;

  const arenaCards = useMemo(() => {
    if (!arena) return { a: null as Card | null, b: null as Card | null };
    const a = deckA.find((c) => c.id === arena.deckA) ?? null;
    const b = deckB.find((c) => c.id === arena.deckB) ?? null;
    return { a, b };
  }, [deckA, deckB, arena]);

  const arenaResult = useMemo(() => {
    if (!arena || !arenaCards.a || !arenaCards.b)
      return null as
        | null
        | { type: "draw"; value: number; attribute: keyof Attrs }
        | {
            type: "win";
            winner: Card;
            loser: Card;
            diff: number;
            attribute: keyof Attrs;
          };

    const attr = arena.attribute;
    const av = Number(arenaCards.a.attributes?.[attr] ?? 0);
    const bv = Number(arenaCards.b.attributes?.[attr] ?? 0);

    if (av === bv) return { type: "draw", value: av, attribute: attr } as const;
    return {
      type: "win",
      winner: av > bv ? arenaCards.a : arenaCards.b,
      loser: av > bv ? arenaCards.b : arenaCards.a,
      diff: Math.abs(av - bv),
      attribute: attr,
    } as const;
  }, [arena, arenaCards]);

  const cardIndex = useMemo(() => {
    const idx = new Map<string, Card>();
    deckA.forEach((c) => idx.set(c.id, c));
    deckB.forEach((c) => idx.set(c.id, c));
    return idx;
  }, [deckA, deckB]);

  return (
    <div className="min-h-screen w-full bg-neutral-50 text-neutral-900">
      <Header />

      <section className="w-full px-4 mt-4">
        <h2 className="text-xl font-semibold mb-3">Arena de Batalha</h2>
        {!arena ? (
          <div className="rounded-xl border border-neutral-200 bg-white p-4 text-neutral-600">
            Configure <code>/arena.ts</code> assim:
            <pre className="mt-2 text-xs bg-neutral-50 p-2 rounded-lg overflow-auto">{`{
    attribute: "aura",
    deckA: "a-carlos",
    deckB: "b-jorge",
    playerAName: "Erick",
    playerBName: "Erick 2",
  },`}</pre>
          </div>
        ) : (
          <ArenaView
            left={arenaCards.a}
            right={arenaCards.b}
            attribute={arena.attribute}
            result={arenaResult}
            leftId={arena.deckA}
            rightId={arena.deckB}
            leftLabel={arena.playerAName || "Jogador A"}
            rightLabel={arena.playerBName || "Jogador B"}
          />
        )}
      </section>

      <section className="w-full px-4 mt-10">
        <h3 className="text-lg font-semibold">Deck A</h3>
        <CardsGrid cards={deckA} />
      </section>

      <section className="w-full px-4 mt-6">
        <h3 className="text-lg font-semibold">Deck B</h3>
        <CardsGrid cards={deckB} />
      </section>

      <section className="w-full px-4 mt-10 pb-16">
        <h2 className="text-xl font-semibold mb-3">Histórico de Batalhas</h2>
        {!winners || winners.length === 0 ? (
          <div className="rounded-xl border border-dashed border-neutral-300 bg-white p-6 text-neutral-600">
            Ainda não há vencedores. Após o PR do vencedor, adicione uma entrada
            em <code>/winners.ts</code>.
          </div>
        ) : (
          <ul className="space-y-4">
            {winners.map((w, i) => {
              const winC = cardIndex.get(w.winner) || null;
              const losC = cardIndex.get(w.loser) || null;

              return (
                <li
                  key={`${w}-${i}`}
                  className="rounded-2xl border border-neutral-200 bg-white p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {w.playerAName && (
                        <span className="text-xs rounded-full bg-neutral-100 border px-2 py-0.5">
                          A: {w.playerAName}
                        </span>
                      )}
                      {w.playerBName && (
                        <span className="text-xs rounded-full bg-neutral-100 border px-2 py-0.5">
                          B: {w.playerBName}
                        </span>
                      )}
                      <span className="text-xs rounded-full bg-emerald-600 text-white px-3 py-1">
                        Vencedor por {w.attribute} (+{w.diff})
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 items-stretch">
                    {/* Vencedor */}
                    <CardThumb
                      card={winC}
                      label={
                        w.winnerName ? `Vencedor — ${w.winnerName}` : "Vencedor"
                      }
                    />

                    {/* VS */}
                    <div className="flex items-center justify-center text-2xl font-black">
                      VS
                    </div>

                    {/* Perdedor */}
                    <CardThumb card={losC} label="Perdedor" />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <Footer />
    </div>
  );
}

function CardThumb({ card, label }: { card: Card | null; label: string }) {
  if (!card) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-300 p-4 text-neutral-500">
        <div className="text-sm font-medium">{label}</div>
        <div className="mt-2 text-xs">Carta não encontrada</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* Nome / apelido fora da carta */}
      <div className="text-center mb-2">
        <div className="text-[11px] text-neutral-500 font-medium">{label}</div>
        <h4 className="text-sm font-bold leading-tight">{card.teacher}</h4>
        {card.nickname && (
          <p className="text-xs text-neutral-600">{card.nickname}</p>
        )}
      </div>

      {/* Carta inteira */}
      <div className="w-full bg-neutral-100 rounded-xl p-2 flex items-center justify-center">
        <img
          src={card.image}
          alt={card.teacher}
          loading="lazy"
          className="w-full h-auto object-contain rounded-lg"
          style={{ maxHeight: "260px" }} // ajuste se quiser miniaturas maiores/menores
        />
      </div>
    </div>
  );
}
