// External Library
import { useMemo } from "react";

// Types
import type { Attrs, Card } from "_types/arena";

type ArenaViewProps = {
  left: Card | null;
  right: Card | null;
  attribute: keyof Attrs;
  result:
    | null
    | { type: "draw"; value: number; attribute: keyof Attrs }
    | {
        type: "win";
        winner: Card;
        loser: Card;
        diff: number;
        attribute: keyof Attrs;
      };
  leftId: string;
  rightId: string;
  leftLabel: string;
  rightLabel: string;
};

export default function ArenaView({
  left,
  right,
  attribute,
  result,
  leftId,
  rightId,
  leftLabel,
  rightLabel,
}: ArenaViewProps) {
  const winnerLabel = useMemo(() => {
    if (!result || result.type !== "win") return null;
    const winId = result.winner.id;
    return winId === leftId ? leftLabel : rightLabel;
  }, [result, leftId, rightId, leftLabel, rightLabel]);

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4">
      {!left || !right ? (
        <p className="text-neutral-600 text-sm">
          Defina as cartas no <code>arena.json</code> para iniciar a disputa.
        </p>
      ) : (
        <div>
          {/* topo: labels dos jogadores e atributo em disputa */}
          <div className="mb-3 flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs rounded-full bg-neutral-100 border px-2 py-0.5">
              A: {leftLabel}
            </span>
            <div className="text-sm font-semibold text-center flex-1">
              Atributo em disputa: <span className="uppercase">{attribute}</span>
            </div>
            <span className="text-xs rounded-full bg-neutral-100 border px-2 py-0.5">
              B: {rightLabel}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 items-stretch gap-4">
            {/* Carta A */}
            <CardOnlyImage
              title={left.teacher}
              subtitle={left.nickname}
              label={`Deck A — ${leftLabel}`}
              src={left.image}
            />

            {/* Centro: VS + resultado */}
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="text-2xl font-black">VS</div>
              {result?.type === "draw" && (
                <span className="text-xs rounded-full bg-amber-500 text-white px-3 py-1">
                  Empate em {result.attribute}
                </span>
              )}
              {result?.type === "win" && (
                <span className="text-xs rounded-full bg-emerald-600 text-white px-3 py-1 text-center">
                  Vencedor: {result.winner.teacher}
                  {winnerLabel ? ` (${winnerLabel})` : ""} +{result.diff} em {result.attribute}
                </span>
              )}
            </div>

            {/* Carta B */}
            <CardOnlyImage
              title={right.teacher}
              subtitle={right.nickname}
              label={`Deck B — ${rightLabel}`}
              src={right.image}
            />
          </div>
        </div>
      )}
    </div>
  );
}

/** Exibe a carta inteira com nome/apelido fora da carta (acima) */
function CardOnlyImage({
  title,
  subtitle,
  label,
  src,
}: {
  title?: string;
  subtitle?: string;
  label?: string;
  src?: string;
}) {
  return (
    <div className="flex flex-col items-center">
      {/* Nome / apelido fora da carta */}
      <div className="text-center mb-2">
        <h3 className="text-base font-bold leading-tight">{title}</h3>
        {subtitle && <p className="text-xs text-neutral-600">{subtitle}</p>}
        {label && (
          <p className="mt-0.5 text-[11px] text-neutral-500 font-medium">{label}</p>
        )}
      </div>

      {/* Carta ocupa o espaço do container sem cortes */}
      <div className="w-full bg-neutral-100 rounded-xl p-2 flex items-center justify-center">
        {/* Ajuste o maxHeight conforme seu layout */}
        <img
          src={src}
          alt={title || "card"}
          loading="lazy"
          className="w-full h-auto object-contain rounded-lg"
          style={{ maxHeight: "420px" }}
        />
      </div>
    </div>
  );
}
