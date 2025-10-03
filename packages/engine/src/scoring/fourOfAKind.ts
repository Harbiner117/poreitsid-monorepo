import type { Card } from "../cards";
import type { GameState, PlayerId } from "../types";

export function scoreFourOfAKind(state: GameState, player: PlayerId, set: Card[]): number {
  if (set.length !== 4) throw new Error("FoK must have 4 cards");
  const rank = set[0].rank;
  if (!set.every(c => c.rank === rank)) throw new Error("FoK requires same rank");

  const trump = state.trumpSuit;
  const allSameSuit = set.every(c => c.suit === set[0].suit);
  const allTrumpSuit = set.every(c => c.suit === trump);

  let base = 0;
  let allowMultipliers = true;

  switch (rank) {
    case "7": {
      base = 4;
      allowMultipliers = false;
      const bonus = Math.min(3, set.filter(c => c.suit === trump).length);
      base += bonus; // max 7
      break;
    }
    case "8":
    case "9":
      base = 2; break;
    case "10":
      if (allTrumpSuit) throw new Error("10s FoK only for non-trump");
      base = 2; break;
    case "J":
      base = 4; break;
    case "Q":
      base = 6; break;
    case "K":
      base = 8; break;
    case "A":
      if (allTrumpSuit) throw new Error("A FoK only for non-trump");
      base = 10; break;
    default:
      throw new Error("Unsupported rank");
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
