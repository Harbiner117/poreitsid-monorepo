import type { Card } from "../cards";
import type { GameState, PlayerId } from "../types";

export function scoreWedding(state: GameState, player: PlayerId, pair: Card[]): number {
  if (pair.length !== 2) throw new Error("Wedding requires exactly two cards");
  const [a, b] = pair;
  const sameSuit = a.suit === b.suit;
  const hasKQ = (a.rank === "K" && b.rank === "Q") || (a.rank === "Q" && b.rank === "K");
  if (!sameSuit || !hasKQ) throw new Error("Invalid Wedding");
  const pts = a.suit === state.trumpSuit ? 4 : 2;
  state.players[player].points += pts;
  state.players[player].scoring.weddings.push([a, b]);
  return pts;
}
