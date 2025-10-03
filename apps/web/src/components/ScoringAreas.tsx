import React from "react";
import type { ScoringAreas } from "@poreitsid/engine";

export function ScoringAreasView({ scoring }: { scoring: ScoringAreas }) {
  return (
    <div className="grid md:grid-cols-4 gap-3">
      <Section title="Weddings" count={scoring.weddings.length} />
      <Section title="Four of a Kind" count={scoring.fourOfAKind.length} />
      <Section title="50-Point Combo" count={scoring.fiftyPoint.length} />
      <Section title="Trump Set (25)" count={scoring.trumpSet25.length} />
    </div>
  );
}

function Section({ title, count }: { title: string; count: number }) {
  return (
    <div className="rounded-2xl p-3 border bg-white">
      <div className="text-sm text-gray-600">{title}</div>
      <div className="text-2xl font-bold">{count}</div>
    </div>
  );
}
