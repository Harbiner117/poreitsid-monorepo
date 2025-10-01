import { Game } from './game';

describe('Game', () => {
  it('should initialize with correct number of players', () => {
    const game = new Game({ playerCount: 2, initialHandSize: 5 });
    const state = game.getState();
    
    expect(state.players).toHaveLength(2);
    expect(state.currentPlayer).toBe(0);
    expect(state.isGameOver).toBe(false);
  });

  it('should create a deck with 52 cards', () => {
    const game = new Game({ playerCount: 2, initialHandSize: 5 });
    const state = game.getState();
    
    expect(state.deck).toHaveLength(52);
  });

  it('should not have duplicate cards', () => {
    const game = new Game({ playerCount: 2, initialHandSize: 5 });
    const state = game.getState();
    const cardIds = state.deck.map(c => c.id);
    const uniqueIds = new Set(cardIds);
    
    expect(uniqueIds.size).toBe(cardIds.length);
  });
});
