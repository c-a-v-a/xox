import { Cell, Turn } from './board';

function randomPlayers(playerOne: string, playerTwo: string): [string, string] {
  const rand = Math.random() >= 0.5;

  if (rand) {
    return [playerOne, playerTwo];
  } else {
    return [playerTwo, playerOne];
  }
}

function randomPlayer(): Turn {
  const rand = Math.random() >= 0.5;
  return rand ? Cell.X : Cell.O;
}

export { randomPlayers, randomPlayer };