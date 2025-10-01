import { Game } from '@poreitsid/engine';

export class Simulator {
  private gamesPlayed: number = 0;
  private results: Array<{ winner: string; turns: number }> = [];

  public runSimulation(gameCount: number): void {
    console.log(`Running ${gameCount} game simulations...\n`);

    for (let i = 0; i < gameCount; i++) {
      this.simulateGame();
      
      if ((i + 1) % 10 === 0) {
        process.stdout.write(`\rProgress: ${i + 1}/${gameCount}`);
      }
    }

    console.log('\n\nSimulation complete!');
    this.printStats();
  }

  private simulateGame(): void {
    const game = new Game({ playerCount: 2, initialHandSize: 5 });
    let turns = 0;
    const maxTurns = 100;

    while (!game.isGameOver() && turns < maxTurns) {
      const state = game.getState();
      const currentPlayer = state.players[state.currentPlayer];
      
      if (currentPlayer.hand.length > 0) {
        const randomCard = currentPlayer.hand[0];
        game.playTurn(currentPlayer.id, randomCard.id);
      }
      
      turns++;
    }

    const winner = game.getWinner();
    if (winner) {
      this.results.push({
        winner: winner.id,
        turns,
      });
      this.gamesPlayed++;
    }
  }

  private printStats(): void {
    console.log('\n=== Simulation Results ===');
    console.log(`Total games: ${this.gamesPlayed}`);
    console.log(`Average turns: ${this.getAverageTurns()}`);
    
    const winCounts = this.getWinCounts();
    console.log('\nWin distribution:');
    Object.entries(winCounts).forEach(([player, wins]) => {
      const percentage = ((wins / this.gamesPlayed) * 100).toFixed(2);
      console.log(`  ${player}: ${wins} wins (${percentage}%)`);
    });
  }

  private getAverageTurns(): number {
    const total = this.results.reduce((sum, r) => sum + r.turns, 0);
    return Math.round(total / this.results.length);
  }

  private getWinCounts(): Record<string, number> {
    const counts: Record<string, number> = {};
    
    this.results.forEach(result => {
      counts[result.winner] = (counts[result.winner] || 0) + 1;
    });
    
    return counts;
  }

  public getResults() {
    return {
      gamesPlayed: this.gamesPlayed,
      results: this.results,
      averageTurns: this.getAverageTurns(),
      winCounts: this.getWinCounts(),
    };
  }
}
