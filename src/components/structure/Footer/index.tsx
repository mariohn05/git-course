export default function Footer() {
  return (
    <footer className="border-t border-neutral-200">
      <div className="w-full px-4 py-8 text-xs text-neutral-500 flex flex-wrap gap-2 items-center justify-between">
        <span>Aprenda Git ™</span>
        <span>
          Arquivos: <code>/deck.ts</code>,{" "}
          <code>/arena.ts</code>, <code>/winners.ts</code>
        </span>
      </div>
    </footer>
  );
}
