// Core game types
export interface Card {
  id: string;
  name: string;
  value: number;
  suit: string;
}

export interface Player {
  id: string;
  name: string;
  hand: Card[];
  score: number;
}

export interface GameState {
  players: Player[];
  currentPlayer: number;
  deck: Card[];
  isGameOver: boolean;
  winner?: string;
}

export interface GameConfig {
  playerCount: number;
  initialHandSize: number;
}
