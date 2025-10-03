// apps/web/src/lib/engine.ts
export type Card = { id: string; rank: string; suit: string };
export type PlayerView = { hand: Card[]; used: Card[]; dead: Card[]; score: number; name: string };
export type Combo = { id: string; label: string };

export type GameState = {
  turn: number;
  trump: string | null;
  players: [PlayerView, PlayerView];
  board: { p0?: Card; p1?: Card };
  canScore: boolean;
  scoreOptions: Combo[];
  winner?: 0 | 1;
  roundOver?: boolean;
  /** Winner of the last battle who is allowed to score this window */
  scoreEligible?: 0 | 1;   // <— add this
};

class Engine {
  private _state: GameState;

  constructor() {
    this._state = {
      turn: 0,
      trump: null,
      players: [
        { name: 'You', hand: [], used: [], dead: [], score: 0 },
        { name: 'AI',  hand: [], used: [], dead: [], score: 0 }
      ],
      board: {},
      canScore: false,
      scoreOptions: [],
      roundOver: false,
      scoreEligible: undefined,
    };
  }

  get state(): GameState {
    const s = this._state;
    return {
      ...s,
      players: s.players.map(p => ({
        ...p,
        hand: [...p.hand],
        used: [...p.used],
        dead: [...p.dead],
      })) as [PlayerView, PlayerView],
      board: { ...s.board },
      scoreOptions: [...s.scoreOptions],
    };
  }

  newGame() {
    const sample: Card[] = [
      { id: 'AS', rank: 'A', suit: '♠' }, { id: 'KD', rank: 'K', suit: '♦' },
      { id: 'QS', rank: 'Q', suit: '♠' }, { id: 'JD', rank: 'J', suit: '♦' },
      { id: '10S', rank: '10', suit: '♠' }
    ];

    this._state = {
      ...this._state,
      turn: 0,
      trump: '♠',
      board: {},
      canScore: false,
      scoreOptions: [],
      winner: undefined,
      roundOver: false,
      scoreEligible: undefined,
      players: [
        { ...this._state.players[0], hand: [...sample], used: [], dead: [], score: 0, name: 'You' },
        { ...this._state.players[1], hand: sample.map(c => ({ ...c, id: c.id + '-b' })), used: [], dead: [], score: 0, name: 'AI' },
      ] as [PlayerView, PlayerView],
    };
  }

  playCard(player: 0|1, cardId: string) {
    if (this._state.winner || this._state.roundOver) return;

    const p = this._state.players[player];
    const idx = p.hand.findIndex(c => c.id === cardId);
    if (idx < 0) return;

    const card = p.hand.splice(idx, 1)[0];
    if (player === 0) this._state.board.p0 = card; else this._state.board.p1 = card;

    if (player === 0 && !this._state.board.p1) this.aiAutoPlay();

    if (this._state.board.p0 && this._state.board.p1) this.resolveBattle();
  }

  score(comboId: string) {
    // only allow last-battle winner; MVP lets human (0) trigger scoring
    if (this._state.scoreEligible !== 0) {
      this._state.canScore = false;
      this._state.scoreOptions = [];
      this._state.scoreEligible = undefined;
      return;
    }

    if (comboId !== 'skip') this._state.players[0].score += 5;

    this._state.canScore = false;
    this._state.scoreOptions = [];
    this._state.scoreEligible = undefined;

    const target = 30;
    const p0 = this._state.players[0].score;
    const p1 = this._state.players[1].score;
    if (p0 >= target || p1 >= target) {
      this._state.winner = p0 >= target ? 0 : 1;
    }
  }

  // --- helpers ---
  private aiAutoPlay() {
    const ai = this._state.players[1];
    if (this._state.board.p1 || ai.hand.length === 0) return;
    const card = ai.hand.shift()!;
    this._state.board.p1 = card;
  }

  private resolveBattle() {
    // placeholder: alternate winner
    const winner: 0|1 = (this._state.turn % 2 === 0) ? 0 : 1;

    const w = this._state.players[winner];
    if (this._state.board.p0) w.dead.push(this._state.board.p0);
    if (this._state.board.p1) w.dead.push(this._state.board.p1);
    this._state.board = {};
    this._state.turn++;

    const handsEmpty = this._state.players[0].hand.length === 0 && this._state.players[1].hand.length === 0;
    if (handsEmpty) this._state.roundOver = true;

    this._state.canScore = true;
    this._state.scoreOptions = [
      { id: 'skip', label: 'Skip' },
      { id: 'wedding', label: 'Wedding (K+Q)' },
      { id: 'four-kind', label: 'Four of a Kind' },
      { id: 'royal', label: 'Royal Flush' },
    ];
    this._state.scoreEligible = winner; // <— typed, no any
  }
}

export const engine = new Engine();
