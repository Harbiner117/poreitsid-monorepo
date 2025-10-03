import React from 'react';

export type CardProps = {
  rank: string;
  suit: string;
  onClick?: () => void;
};

export function Card({ rank, suit, onClick }: CardProps) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl border p-3 shadow min-w-[60px] text-center hover:scale-105 transition"
      title={`${rank}${suit}`}
    >
      <div className="text-xl font-bold">{rank}</div>
      <div className="text-lg">{suit}</div>
    </button>
  );
}
