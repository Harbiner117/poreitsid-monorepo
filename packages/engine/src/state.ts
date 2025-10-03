import type { Card } from "./cards";
import { SUITS, RANKS } from "./cards";
import type { GameState, PlayerId } from "./types";
import { shuffle } from "./deck";

function buildDeck(): Card[] {
  const cards: Card[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      for (let copy = 0; copy < 4; copy++) {
        cards.push({ suit, rank, id: `${suit}-${rank}-${copy}` });
      }
    }
  }
  return cards;
}

export function drawOne(pile: Card[]): Card {
  const c = pile.shift();
  if (!c) throw new Error("Draw pile empty");
  return c;
}

export function initialState(rng = Math.random): GameState {
  const deck = shuffle(buildDeck(), rng);

  const dealer: PlayerId = rng() < 0.5 ? 0 : 1;
  const p0hand = deck.splice(0, 16);
  const p1hand = deck.splice(0, 16);

  const indicator = deck.shift()!;
  const trumpSuit = indicator.suit;

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
    turn: dealer === 0 ? 1 : 0,
    phase: "NORMAL",
    players: {
      0: { hand: p0hand, scoring: emptyScoring(), used: [], dead: [], points: 0 },
      1: { hand: p1hand, scoring: emptyScoring(), used: [], dead: [], points: 0 },
    },
    currentTrick: { leader: dealer === 0 ? 1 : 0, plays: [] },
    buyTrumpWindowOpen: true,
    lastTwo: { faceUpTrumpSeven: null, lastFaceDown: null, active: false },
  };

  return state;
}
