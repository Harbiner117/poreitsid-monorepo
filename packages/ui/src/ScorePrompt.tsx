import React from 'react';

export type ScorePromptProps = {
  options: { id: string; label: string }[];
  onPick: (id: string) => void;
};

export function ScorePrompt({ options, onPick }: ScorePromptProps) {
  if (!options?.length) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md space-y-3">
        <h3 className="text-xl font-semibold">Choose a scoring option</h3>
        <div className="grid gap-2">
          {options.map((o) => (
            <button
              key={o.id}
              onClick={() => onPick(o.id)}
              className="rounded-xl border p-3 hover:bg-gray-50 text-left"
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
