import type { Card } from "../cards";
import type { GameState, PlayerId } from "../types";

const isJD = (c: Card) => c.rank === "J" && c.suit === "♦";
const isQS = (c: Card) => c.rank === "Q" && c.suit === "♠";

// 50-Point Combo: exactly 2×J♦ + 2×Q♠
export function scoreFiftyPoint(state: GameState, player: PlayerId, cards: Card[]): number {
  if (cards.length !== 4) throw new Error("50-point combo requires 4 cards");
  const jds = cards.filter(isJD).length;
  const qss = cards.filter(isQS).length;
  if (jds !== 2 || qss !== 2) throw new Error("Invalid 50-point combo");
  state.players[player].points += 50;
  state.players[player].scoring.fiftyPoint.push(cards);
  return 50;
}
