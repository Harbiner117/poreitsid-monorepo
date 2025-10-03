import type { Card, Suit } from "./cards";
import type { PlayerId } from "./types";

export type Action =
  | { type: "BUY_TRUMP"; player: PlayerId; withTrumpSeven: Card } // replace indicator with 7 of trump (+1)
  | { type: "PLAY_CARD"; player: PlayerId; card: Card }
  | { type: "RESOLVE_TRICK" }
  | { type: "SCORE_COMBO"; player: PlayerId; combo: ComboRequest }
  | { type: "SKIP_SCORING"; player: PlayerId }
  | { type: "DRAW"; player: PlayerId }
  | { type: "ENTER_KIM" }
  | { type: "PLAY_KIM_CARD"; player: PlayerId; card: Card }
  | { type: "RESOLVE_KIM_TRICK" }
  | { type: "TALLY_KIM" }
  | { type: "CHECK_GAME_END" };

export type ComboRequest =
  | { kind: "WEDDING"; cards: Card[] }            // [K, Q] same suit
  | { kind: "FOUR_OF_A_KIND"; cards: Card[] }     // rank set
  | { kind: "ROYAL_TRUMP_SET"; cards: Card[] }    // 25-point trump set
  | { kind: "FIFTY_POINT"; cards: Card[] };       // 2×J♦ + 2×Q♠
