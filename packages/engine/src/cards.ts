// Card models, enums, helpers

export type Suit = "♠" | "♥" | "♦" | "♣";

// Normal rank order in Battle (Normal Play): 7 < 8 < 9 < K < J < Q < 10 < A
// Kim rank order: 7 < 8 < 9 < 10 < J < Q < K < A
export type Rank = "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A";

export interface Card {
  suit: Suit;
  rank: Rank;
  // Deck has 4x copies of each exact card, so give each an id to distinguish:
  id: string; // e.g., "♦-J-2" (suit-rank-copyIndex)
}

export const SUITS: Suit[] = ["♠", "♥", "♦", "♣"];
export const RANKS: Rank[] = ["7", "8", "9", "K", "J", "Q", "10", "A"];

export const KIM_RANKS: Rank[] = ["7", "8", "9", "10", "J", "Q", "K", "A"];

export function isSameExactCard(a: Card, b: Card) {
  return a.suit === b.suit && a.rank === b.rank;
}

export function cardKey(c: Card) {
  return `${c.suit}-${c.rank}`;
}
