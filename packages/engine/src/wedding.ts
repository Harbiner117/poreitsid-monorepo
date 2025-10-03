import type { Card } from "../cards";
import type { GameState, PlayerId } from "../types";

// Non-trump Wedding (K+Q same suit) = 2; Trump Wedding = 4
export function scoreWedding(state: GameState, player: PlayerId, pair: Card[]): number {
  if (pair.length !== 2) throw new Error("Wedding requires exactly two cards");
  const [a, b] = pair;
  const sameSuit = a.suit === b.suit;
  const ranks = [a.rank, b.rank].sort().join("-");
  if (!sameSuit || !ranks.includes("K") || !ranks.includes("Q")) {
    throw new Error("Invalid Wedding");
  }
  const pts = a.suit === state.trumpSuit ? 4 : 2;
  state.players[player].points += pts;
  state.players[player].scoring.weddings.push([a, b]);
  return pts;
}
