import { Card, GameState, GameConfig, Player } from './types';

export class Game {
  private state: GameState;
  private config: GameConfig;

  constructor(config: GameConfig) {
    this.config = config;
    this.state = this.initializeGame();
  }

  private initializeGame(): GameState {
    const deck = this.createDeck();
    const players = this.createPlayers();
    
    return {
      players,
      currentPlayer: 0,
      deck,
      isGameOver: false,
    };
  }

  private createDeck(): Card[] {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const deck: Card[] = [];
    
    for (const suit of suits) {
      for (let value = 1; value <= 13; value++) {
        deck.push({
          id: `${suit}-${value}`,
          name: `${value} of ${suit}`,
          value,
          suit,
        });
      }
    }
    
    return this.shuffleDeck(deck);
  }

  private shuffleDeck(deck: Card[]): Card[] {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  private createPlayers(): Player[] {
    return Array.from({ length: this.config.playerCount }, (_, i) => ({
      id: `player-${i}`,
      name: `Player ${i + 1}`,
      hand: [],
      score: 0,
    }));
  }

  public getState(): GameState {
    return { ...this.state };
  }

  public playTurn(playerId: string, cardId: string): boolean {
    // Simple placeholder game logic
    const player = this.state.players.find(p => p.id === playerId);
    if (!player) return false;

    const cardIndex = player.hand.findIndex(c => c.id === cardId);
    if (cardIndex === -1) return false;

    const card = player.hand.splice(cardIndex, 1)[0];
    player.score += card.value;

    // Check for game over
    if (player.hand.length === 0) {
      this.state.isGameOver = true;
      this.state.winner = playerId;
    }

    // Move to next player
    this.state.currentPlayer = 
      (this.state.currentPlayer + 1) % this.state.players.length;

    return true;
  }

  public isGameOver(): boolean {
    return this.state.isGameOver;
  }

  public getWinner(): Player | undefined {
    return this.state.players.find(p => p.id === this.state.winner);
  }
}
