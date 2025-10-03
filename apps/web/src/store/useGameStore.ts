import { create } from "zustand";
import {
  initialState,
  reducer,
  type GameState,
  type Action,
} from "@poreitsid/engine";

interface Store {
  state: GameState;
  dispatch: (action: Action) => void;
}

export const useGameStore = create<Store>((set, get) => ({
  state: initialState(),
  dispatch: (action) => {
    const next = reducer({ ...get().state }, action);
    set({ state: next });
  },
}));
