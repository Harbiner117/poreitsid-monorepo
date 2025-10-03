// apps/web/src/app/page.tsx
'use client';

import { useGame } from '@/stores/gameStore';
import { Card, ScorePrompt } from '@poreitsid/ui';

export default function Home() {
  const { state, newGame, playCard, score } = useGame();

  return (
    <div className="min-h-screen p-6">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Poreitsid Game</h1>
        <button
          onClick={newGame}
          className="rounded-xl border px-4 py-2 shadow hover:bg-gray-50"
        >
          New Game
        </button>
      </header>

      {/* Info row */}
      <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
        <div>
          Trump: <span className="font-semibold">{state.trump ?? '—'}</span>
        </div>
        <div>Turn: {state.turn}</div>
      </div>

      {/* Scores */}
      <div className="flex gap-6 mb-6">
        {state.players.map((p, i) => (
          <div key={i} className="rounded-2xl border p-4 flex-1">
            <div className="font-semibold">{p.name}</div>
            <div>Score: {p.score}</div>
            <div className="text-sm text-gray-500">
              Dead: {p.dead.length} • Used: {p.used.length}
            </div>
          </div>
        ))}
      </div>

      {/* Board */}
      <div className="rounded-2xl border p-6 mb-6">
        <div className="font-semibold mb-3">Board</div>
        <div className="flex gap-6">
          <div className="flex-1">
            <div className="text-sm text-gray-500 mb-2">You</div>
            <div className="min-h-[90px] rounded-xl border p-3 flex items-center justify-center">
              {state.board.p0 ? (
                <Card rank={state.board.p0.rank} suit={state.board.p0.suit} />
              ) : (
                <span className="text-gray-400">—</span>
              )}
            </div>
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-500 mb-2">AI</div>
            <div className="min-h-[90px] rounded-xl border p-3 flex items-center justify-center">
              {state.board.p1 ? (
                <Card rank={state.board.p1.rank} suit={state.board.p1.suit} />
              ) : (
                <span className="text-gray-400">—</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Your Hand */}
      <div className="rounded-2xl border p-6">
        <div className="font-semibold mb-3">Your Hand</div>
        <div className="flex flex-wrap gap-3">
          {state.players[0].hand.map((c) => (
            <Card
              key={c.id}
              rank={c.rank}
              suit={c.suit}
              onClick={() => playCard(c.id)}
            />
          ))}
        </div>
      </div>

      {/* Scoring prompt */}
      {state.canScore && (
        <ScorePrompt
          options={state.scoreOptions}
          onPick={(id) => score(id)}
        />
      )}

      {/* Banners */}
      {state.roundOver && !state.winner && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 rounded-xl bg-white/90 border px-4 py-2 shadow">
          Round over — start a new game to continue
        </div>
      )}
      {typeof state.winner !== 'undefined' && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 rounded-xl bg-green-600 text-white px-4 py-2 shadow">
          {state.winner === 0 ? 'You win!' : 'AI wins!'}
        </div>
      )}
    </div>
  );
}
