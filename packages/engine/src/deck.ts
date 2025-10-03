import { Card, SUITS, RANKS } from "./cards";

// 4× copies of every exact card → 128 cards; no Jokers.
export function buildDeck(): Card[] {
  const cards: Card[] = [];
  let copy = 0;
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      for (copy = 0; copy < 4; copy++) {
        cards.push({ suit, rank, id: `${suit}-${rank}-${copy}` });
      }
    }
  }
  return cards;
}

export function shuffle<T>(arr: T[], rng = Math.random): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
