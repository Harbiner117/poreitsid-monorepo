import { create } from "zustand";
import {
  initialState,
  reducer,
  type GameState,
  type Action,
} from "@poreitsid/engine";

// Simple seeded RNG (mulberry32)
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Use a constant seed so SSR and client match.
// (Later you could pass a seed via search params/cookie to vary games.)
const seededRng = mulberry32(123456);

interface Store {
  state: GameState;
  dispatch: (action: Action) => void;
}

export const useGameStore = create<Store>((set, get) => ({
  state: initialState(seededRng),
  dispatch: (action) => {
    const next = reducer({ ...get().state }, action);
    set({ state: next });
  },
}));
