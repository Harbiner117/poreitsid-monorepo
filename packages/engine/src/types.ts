import type { Card, Rank, Suit } from "./cards";

export type PlayerId = 0 | 1;

export type Zone = "HAND" | "SCORING" | "USED" | "DEAD";

export interface ScoringAreas {
  weddings: Card[][];      // each entry is [K, Q] same suit
  fourOfAKind: Card[][];   // 4 cards of same rank (with suit multipliers rules)
  fiftyPoint: Card[][];    // specifically [J♦, J♦, Q♠, Q♠]
  trumpSet25: Card[][];    // “Royal Flush / Trump Set” per your rules
}

export interface PlayerBoardState {
  hand: Card[];
  scoring: ScoringAreas;
  used: Card[];
  dead: Card[];
  points: number; // cumulative game total
}

export type Phase = "SETUP" | "NORMAL" | "KIM" | "ENDED";

export interface Trick {
  leader: PlayerId;
  plays: { player: PlayerId; card: Card }[];
  winner?: PlayerId;
}

export interface LastTwo {
  faceUpTrumpSeven: Card | null; // reserved 7 of trump shown
  lastFaceDown: Card | null;     // the final hidden card
  active: boolean;
}

export interface GameConfig {
  targetPoints: number; // 150
}

export interface GameState {
  config: GameConfig;
  deck: Card[];
  drawPile: Card[];
  trumpSuit: Suit;
  indicatorCard: Card; // the face-up indicator (becomes 7 of trump if bought)
  dealer: PlayerId;
  turn: PlayerId; // who acts next (lead / response / scoring decision)
  phase: Phase;

  // zones by player
  players: Record<PlayerId, PlayerBoardState>;

  // trick / battle
  currentTrick: Trick | null;

  // pre-game “buy trump” window (dealer first, else passes once)
  buyTrumpWindowOpen: boolean;

  // last two cards protocol
  lastTwo: LastTwo;
}
