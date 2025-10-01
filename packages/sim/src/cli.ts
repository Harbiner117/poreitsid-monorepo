#!/usr/bin/env node
import { Simulator } from './simulator';

const args = process.argv.slice(2);
const gamesArg = args.find(arg => arg.startsWith('--games='));
const gameCount = gamesArg 
  ? parseInt(gamesArg.split('=')[1], 10) 
  : 100;

if (isNaN(gameCount) || gameCount < 1) {
  console.error('Error: --games must be a positive number');
  process.exit(1);
}

const simulator = new Simulator();
simulator.runSimulation(gameCount);
