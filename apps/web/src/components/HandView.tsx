import React from "react";
import { CardView } from "./CardView";
import type { Card } from "@poreitsid/engine";

export function HandView({
  cards,
  onPlay,
}: { cards: Card[]; onPlay?: (c: Card) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {cards.map((c) => (
        <CardView key={c.id} card={c} onClick={() => onPlay?.(c)} />
      ))}
    </div>
  );
}
