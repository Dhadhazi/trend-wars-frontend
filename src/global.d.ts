type PairType = {
  word: string;
  score: number;
  winner: boolean;
};

type GameDeckType = {
  _id: string;
  name: string;
  description: string;
  dateString: string;
  category: number;
  geo: string;
  pairs: [[PairType, PairType]];
};
