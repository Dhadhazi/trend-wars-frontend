type PairType = {
  word: string;
  score: number;
  winner: boolean;
};

type MultiPlayer = {
  nick: string;
  points: number;
};

type GameRoomType = {
  gameId: string;
  creator: string;
  state: number;
  answers: number;
  players: [MultiPlayer];
  gameDeck: GameDeckType;
  heads: number[];
};

type GameDeckType = {
  _id: string;
  name: string;
  description: string;
  dateString: string;
  category: number;
  geo: string;
  pairs: [[PairType, PairType]];
  timer: number;
  gameMode: enum;
};
