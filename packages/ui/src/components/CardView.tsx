"use client";
import React from "react";

export type Card = {
  id: string;
  rank: string;
  suit: string;
};

export function CardView({ card, onClick }: { card: Card; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl shadow p-3 border bg-white hover:shadow-md transition"
      aria-label={`${card.rank}${card.suit}`}
      title={`${card.rank}${card.suit}`}
    >
      <div className="text-xl font-semibold">{card.rank}</div>
      <div className="text-2xl">{card.suit}</div>
    </button>
  );
}
