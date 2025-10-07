export default function Header() {
  return (
    <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b border-neutral-200">
      <div className="w-full px-4 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Super Trunfo de Professores
          </h1>
        </div>
        <span className="text-xs rounded-full px-3 py-1 bg-black text-white">
          VI Wecomp
        </span>
      </div>
    </header>
  );
}
