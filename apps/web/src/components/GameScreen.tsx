"use client";

import { useEngine } from "../hooks/useEngine";
import { CardView } from "@poreitsid/ui";
import { Button } from "./ui/Button"; // or inline button

export default function GameScreen() {
  const { state, dispatch } = useEngine();
  const me = 0 as const; // placeholder

  return (
    <div className="grid gap-4">
      <div className="flex gap-2">
        {state.players[me].hand.map((c) => (
          <CardView key={c.id} card={c} onClick={() => dispatch({ type: "PLAY_CARD", player: me, card: c })} />
        ))}
      </div>

      <div className="flex gap-2">
        <Button onClick={() => dispatch({ type: "RESOLVE_TRICK" })}>Resolve Trick</Button>
        <Button onClick={() => dispatch({ type: "ENTER_KIM" })}>Enter Kim</Button>
      </div>
    </div>
  );
}
