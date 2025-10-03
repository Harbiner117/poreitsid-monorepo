import { buildDeck, shuffle } from "./deck";
import { Card, SUITS } from "./cards";
import type { GameState, GameConfig, PlayerId } from "./types";

// Helper to draw one
export function drawOne(pile: Card[]): Card {
  const c = pile.shift();
  if (!c) throw new Error("Draw pile empty");
  return c;
}

export function initialState(rng = Math.random): GameState {
  const deck = shuffle(buildDeck(), rng);

  // Dealer chosen by higher single draw (7<8<9<K<J<Q<10<A). For engine simplicity here,
  // pick randomly (UI/simulator can implement the pre-draw and pass in dealer).
  const dealer: PlayerId = rng() < 0.5 ? 0 : 1;

  // Deal 16 to each
  const p0hand = deck.splice(0, 16);
  const p1hand = deck.splice(0, 16);

  // Reveal indicator = top of remaining deck
  const indicator = deck.shift()!;
  const trumpSuit = indicator.suit;

  // Construct players
  const emptyScoring = () => ({
    weddings: [] as Card[][],
    fourOfAKind: [] as Card[][],
    fiftyPoint: [] as Card[][],
    trumpSet25: [] as Card[][],
  });

  const state: GameState = {
    config: { targetPoints: 150 },
    deck: [],
    drawPile: deck,
    trumpSuit,
    indicatorCard: indicator,
    dealer,
    turn: (dealer === 0 ? 1 : 0), // Non-dealer leads first trick
    phase: "NORMAL",
    players: {
      0: { hand: p0hand, scoring: emptyScoring(), used: [], dead: [], points: 0 },
      1: { hand: p1hand, scoring: emptyScoring(), used: [], dead: [], points: 0 },
    },
    currentTrick: { leader: dealer === 0 ? 1 : 0, plays: [] },
    buyTrumpWindowOpen: true, // dealer may buy 7 of trump pre-game (then passes once)
    lastTwo: { faceUpTrumpSeven: null, lastFaceDown: null, active: false },
  };

  return state;
}
