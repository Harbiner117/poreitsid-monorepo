import type { Card } from "../cards";
import type { GameState, PlayerId } from "../types";

// Base (before multipliers):
// 7s=4 (no suit multipliers; +1 per trump-7 inside set; max total 7)
// 8s=2, 9s=2, 10s (non-trump)=2, J (non-trump, non-♦)=4, Q=6, K=8, A (non-trump)=10
// Multipliers: all same non-trump suit ×2; all trump suit ×4 (except 7s special set w/ its own rule)
export function scoreFourOfAKind(state: GameState, player: PlayerId, set: Card[]): number {
  if (set.length !== 4) throw new Error("FoK must have 4 cards");
  const sameRank = set.every(c => c.rank === set[0].rank);
  if (!sameRank) throw new Error("FoK requires same rank");
  const rank = set[0].rank;
  const trump = state.trumpSuit;

  const allSameSuit = set.every(c => c.suit === set[0].suit);
  const allTrumpSuit = set.every(c => c.suit === trump);

  let base = 0;
  let allowMultipliers = true;

  switch (rank) {
    case "7":
      base = 4;
      allowMultipliers = false;
      // +1 per trump-7 inside set; max total 7
      const bonus = Math.min(3, set.filter(c => c.suit === trump).length); // at most 3 bonus to reach 7
      base += bonus;
      break;
    case "8":
    case "9":
      base = 2;
      break;
    case "10":
      // non-trump only
      if (allTrumpSuit) throw new Error("10s FoK only for non-trump");
      base = 2;
      break;
    case "J":
      // non-trump, non-diamond only
      if (allTrumpSuit || set.some(c => c.suit === "♦")) throw new Error("J FoK: non-trump, non-♦ only");
      base = 4;
      break;
    case "Q":
      base = 6;
      break;
    case "K":
      base = 8;
      break;
    case "A":
      // non-trump only
      if (allTrumpSuit) throw new Error("A FoK only for non-trump");
      base = 10;
      break;
    default:
      throw new Error("Unsupported rank for FoK");
  }

  let points = base;
  if (allowMultipliers) {
    if (allTrumpSuit) points *= 4;
    else if (allSameSuit && set[0].suit !== trump) points *= 2;
  }

  state.players[player].points += points;
  state.players[player].scoring.fourOfAKind.push(set);
  return points;
}
