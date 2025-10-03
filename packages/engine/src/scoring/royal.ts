import type { Card } from "../cards";
import type { GameState, PlayerId } from "../types";

export function scoreTrumpSet25(state: GameState, player: PlayerId, cards: Card[]): number {
  const points = 25;
  state.players[player].points += points;
  state.players[player].scoring.trumpSet25.push(cards);
  return points;
}
