import { useGameStore } from "../store/useGameStore";

export function useEngine() {
  const { state, dispatch } = useGameStore();
  return { state, dispatch };
}
