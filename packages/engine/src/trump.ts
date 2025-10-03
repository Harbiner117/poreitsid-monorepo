import type { Card, Suit } from "./cards";
import type { GameState, PlayerId } from "./types";
import { drawOne } from "./state";

// Pre-game buy window: Dealer may buy trump by placing a 7 of trump face-up and taking indicator.
// If dealer cannot, the right passes once to the non-dealer. Buyer gains +1 point.
export function tryBuyTrump(state: GameState, player: PlayerId, sevenOfTrump: Card): boolean {
  if (!state.buyTrumpWindowOpen) return false;
  if (player !== state.dealer && player !== (state.dealer === 0 ? 1 : 0)) return false;

  const suit = state.trumpSuit;
  if (!(sevenOfTrump.rank === "7" && sevenOfTrump.suit === suit)) return false;

  const hand = state.players[player].hand;
  const idx = hand.findIndex(c => c.id === sevenOfTrump.id);
  if (idx === -1) return false;

  // Place player's 7 of trump face-up as new indicator; take previous face-up indicator into hand
  hand.splice(idx, 1);
  const previousIndicator = state.indicatorCard;
  state.indicatorCard = sevenOfTrump;

  hand.push(previousIndicator);

  // +1 point to buyer now
  state.players[player].points += 1;

  // After this, window closes if non-dealer has already had chance; simple rule: close now.
  state.buyTrumpWindowOpen = false;
  return true;
}
