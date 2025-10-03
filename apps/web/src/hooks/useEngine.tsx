import { useGameStore } from "../store/useGameStore";

export function useEngine() {
  const state = useGameStore((s) => s.state);
  const dispatch = useGameStore((s) => s.dispatch);
  return { state, dispatch };
}
