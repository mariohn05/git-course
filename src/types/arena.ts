export type Attrs = {
  aura: number;
  recordeSupino: number;
  estilo: number;
  dificuldadeProva: number;
  fatorMedo: number;
};

export type Card = {
  id: string;
  teacher: string;
  nickname?: string;
  image: string;
  attributes: Attrs;
  notes?: string;
};

export type ArenaState = {
  attribute: keyof Attrs;
  deckA: string;
  deckB: string;
  playerAName?: string;
  playerBName?: string;
};

export type Winner = {
  winner: string;
  loser: string;
  attribute: keyof Attrs;
  diff: number;
  playerAName?: string;
  playerBName?: string;
  winnerName?: string;
};
