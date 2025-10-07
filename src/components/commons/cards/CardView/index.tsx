// Types
import type { Card } from "_types/arena";

type CardViewProps = {
  item: Card;
};

export default function CardView({ item }: CardViewProps) {
  return (
    <article className="flex flex-col items-center rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow border-neutral-200 p-2">
      {/* Nome e apelido fora da carta */}
      <div className="text-center mb-2">
        <h3 className="text-base font-bold leading-tight">{item.teacher}</h3>
        {item.nickname && (
          <p className="text-xs text-neutral-600">{item.nickname}</p>
        )}
      </div>

      {/* Carta ocupando o espaço todo */}
      <div className="flex justify-center items-center w-full">
        <img
          src={item.image}
          alt={item.teacher}
          loading="lazy"
          className="w-full h-auto object-contain rounded-lg"
          style={{ maxHeight: "420px" }}
        />
      </div>
    </article>
  );
}
