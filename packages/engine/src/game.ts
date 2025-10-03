import type { Action } from "./actions";
import type { GameState, PlayerId } from "./types";
import { drawOne } from "./state";
import { trickWinnerNormal } from "./battle";
import { scoreWedding, scoreFourOfAKind, scoreFiftyPoint, scoreTrumpSet25 } from "./scoring";

export function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "PLAY_CARD": {
      const { player, card } = action;
      if (!state.currentTrick) throw new Error("No active trick");
      // remove from player's hand (note: cards in scoring areas/used remain battle-playable per rules)
      const hand = state.players[player].hand;
      const idx = hand.findIndex(c => c.id === card.id);
      if (idx === -1) throw new Error("Card not in hand");
      hand.splice(idx, 1);
      state.currentTrick.plays.push({ player, card });
      // switch turn
      state.turn = (player === 0 ? 1 : 0);
      return state;
    }

    case "RESOLVE_TRICK": {
      const trick = state.currentTrick;
      if (!trick || trick.plays.length < 2) return state;
      const winner = trickWinnerNormal(trick.plays, state.trumpSuit);
      trick.winner = winner;

      // Move both played cards to loser/winner "dead" piles per trick resolution
      trick.plays.forEach(({ player, card }) => {
        state.players[player].dead.push(card);
      });

      // Winner draws first; keep 16 active (the UI may ensure execution order)
      if (state.drawPile.length > 0) {
        state.players[winner].hand.push(drawOne(state.drawPile));
        const loser: PlayerId = winner === 0 ? 1 : 0;
        if (state.drawPile.length > 0) {
          state.players[loser].hand.push(drawOne(state.drawPile));
        } else {
          // Last two cards protocol activation may be handled here when pile hits 2, etc.
        }
      }

      // Trick winner leads next
      state.currentTrick = { leader: winner, plays: [] };
      state.turn = winner;
      return state;
    }

    case "SCORE_COMBO": {
      // The trick winner may score exactly one eligible combo immediately
      const { player, combo } = action;
      let gained = 0;
      if (combo.kind === "WEDDING") gained = scoreWedding(state, player, combo.cards);
      else if (combo.kind === "FOUR_OF_A_KIND") gained = scoreFourOfAKind(state, player, combo.cards);
      else if (combo.kind === "FIFTY_POINT") gained = scoreFiftyPoint(state, player, combo.cards);
      else if (combo.kind === "ROYAL_TRUMP_SET") gained = scoreTrumpSet25(state, player, combo.cards);

      // Check instant end if >= 150 (game ends immediately even mid-round)
      if (state.players[player].points >= state.config.targetPoints) {
        state.phase = "ENDED";
      }
      return state;
    }

    case "SKIP_SCORING": {
      // winner opts not to score now
      return state;
    }

    case "ENTER_KIM": {
      // Collapse zones back into hands; disable further combo scoring
      // (Here we only signal phase change; your UI/simulator can implement the move-to-hand consolidation
      // before setting phase to KIM)
      state.phase = "KIM";
      return state;
    }

    // The rest — Kim play and tally — can mirror the trick logic with Kim rules.
    default:
      return state;
  }
}
