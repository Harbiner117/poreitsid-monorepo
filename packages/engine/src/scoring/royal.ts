import type { Card } from "../cards";
import type { GameState, PlayerId } from "../types";

// “Royal Flush / Trump Set” — fixed 25 points (may be scored at any time)
export function scoreTrumpSet25(state: GameState, player: PlayerId, cards: Card[]): number {
  // Implementation detail: you can enforce your exact pattern here.
  // For now we treat it as a validated trump-composed set provided by the UI/engine checks.
  const points = 25;
  state.players[player].points += points;
  state.players[player].scoring.trumpSet25.push(cards);
  return points;
}
