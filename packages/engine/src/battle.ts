import { Card, RANKS, KIM_RANKS } from "./cards";
import type { PlayerId } from "./types";

export function compareRankBattle(a: Card, b: Card): number {
  // For Normal play: 7 < 8 < 9 < K < J < Q < 10 < A
  const order = RANKS;
  return order.indexOf(a.rank) - order.indexOf(b.rank);
}

export function compareRankKim(a: Card, b: Card): number {
  const order = KIM_RANKS;
  return order.indexOf(a.rank) - order.indexOf(b.rank);
}

export function trickWinnerNormal(
  plays: { player: PlayerId; card: Card }[],
  trumpSuit: Card["suit"]
): PlayerId {
  // No follow-suit requirement; trump beats non-trump; overtrump allowed but not required;
  // identical exact cards tie → earliest play wins.
  let winner = plays[0];
  for (let i = 1; i < plays.length; i++) {
    const cur = plays[i];
    const w = winner.card;
    const c = cur.card;
    const wIsTrump = w.suit === trumpSuit;
    const cIsTrump = c.suit === trumpSuit;

    if (wIsTrump && cIsTrump) {
      if (compareRankBattle(c, w) > 0) winner = cur;
    } else if (!wIsTrump && cIsTrump) {
      winner = cur;
    } else if (!wIsTrump && !cIsTrump) {
      // compare same non-trump ranks
      if (compareRankBattle(c, w) > 0) winner = cur;
    } else {
      // wIsTrump && !cIsTrump → winner stays
    }
  }
  return winner.player;
}

export function trickWinnerKim(
  plays: { player: PlayerId; card: Card }[],
  leadSuit: Card["suit"],
  trumpSuit: Card["suit"]
): PlayerId {
  // Must follow lead suit if able; no must-overtrump; trump beats non-trump; Kim ranks
  let winner = plays[0];
  for (let i = 1; i < plays.length; i++) {
    const w = winner.card;
    const c = plays[i].card;

    const wIsTrump = w.suit === trumpSuit;
    const cIsTrump = c.suit === trumpSuit;

    // If both follow lead suit (or both are trump), compare by Kim order
    if ((w.suit === c.suit && c.suit !== trumpSuit) || (wIsTrump && cIsTrump)) {
      if (compareRankKim(c, w) > 0) winner = plays[i];
      continue;
    }

    // If current is trump and winner not trump → trump wins
    if (cIsTrump && !wIsTrump) {
      winner = plays[i];
      continue;
    }

    // If both non-trump but different suits: the one that followed the lead suit wins
    const cFollow = c.suit === leadSuit;
    const wFollow = w.suit === leadSuit;
    if (cFollow && !wFollow) winner = plays[i];
  }
  return winner.player;
}
