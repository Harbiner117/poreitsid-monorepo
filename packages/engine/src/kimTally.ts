import type { GameState, PlayerId } from "../types";

// After Kim: +1 per Ace in Dead Cards, +1 per Ten in Dead Cards
export function kimEndTally(state: GameState, player: PlayerId): number {
  const dead = state.players[player].dead;
  const bonus = dead.reduce((acc, c) => acc + (c.rank === "A" || c.rank === "10" ? 1 : 0), 0);
  state.players[player].points += bonus;
  return bonus;
}
