import { BoardT, Sign, isBoardEmpty } from './board';
import { Cell, boardChange, checkWin, oppositeSign } from './board';
import { Difficulty } from './settings';

type Move = [number, number];

interface CellData {
  row: number;
  col: number;
  value: Cell;
  evaluation?: number;
}

function newCellData(row: number, col: number, value: Cell): CellData {
  return {
    row: row,
    col: col,
    value: value
  };
}

function playMove(board: BoardT, sign: Sign, difficulty: Difficulty): BoardT {
  if (difficulty === Difficulty.Dumb) {
    return strategyDumb(board, sign);
  } else if (difficulty === Difficulty.Normal) {
    return strategyNormal(board, sign);
  } else {
    return strategyHard(board, sign);
  }
}

function cellEvaluation(boardSize: number, row: number, col: number, sign: Sign): number {
  const min = 0;
  const max = boardSize - 1;
  const mean = Math.floor((min + max) / 2);

  if (row === mean && col === mean) {
    return sign === Cell.X ? 2 : 3;
  } else if ((row === max || row === min) && (col === max || col === min)) {
    return sign === Cell.X ? 3 : 2;
  } else {
    return 1;
  }
}

function possibleMoves(board: BoardT): Array<CellData> {
  const points: Array<Array<CellData>> = board.map((xs, i) => xs.map((x, j) => newCellData(i, j, x)));
  const filtered = points.map(xs => xs.filter(x => x.value === Cell.Empty));
  return filtered.flat();
}

function randomMove(moves: Array<CellData>): Move {
  const randomIndex = Math.floor(Math.random() * moves.length);
  const randomMove = moves[randomIndex];

  return [randomMove.row, randomMove.col];
}

function winningMoves(board: BoardT, moves: Array<CellData>, sign: Sign): Array<BoardT> {
  return moves.map(x => {
    const boardAfter = boardChange(board, x.row, x.col, sign);

    if (checkWin(boardAfter, sign)) {
      return boardAfter;
    } else {
      return null;
    }
  }).filter(x => x !== null) as Array<BoardT>;
}

function blockMoves(board: BoardT, moves: Array<CellData>, sign: Sign): Array<BoardT> {
  return moves.map(x => {
    const boardAfter = boardChange(board, x.row, x.col, oppositeSign(sign));

    if (checkWin(boardAfter, oppositeSign(sign))) {
      return boardChange(board, x.row, x.col, sign);
    } else {
      return null;
    }
  }).filter(x => x !== null) as Array<BoardT>;
}

//
// Strategies
//

// Random moves
function strategyDumb(board: BoardT, sign: Sign): BoardT {
  const moves = possibleMoves(board)
  const move = randomMove(moves);

  return boardChange(board, move[0], move[1], sign);
}

// win when one move away, try to block player
function strategyNormal(board: BoardT, sign: Sign): BoardT {
  const moves = possibleMoves(board);

  // check for win
  const win = winningMoves(board, moves, sign); 

  if (win.length !== 0) {
    return win[0];
  }

  // check for blocks
  const block = blockMoves(board, moves, sign); 

  if (block.length !== 0) {
    return block[0];
  }

  // random
  const rand = randomMove(moves);
  
  return boardChange(board, rand[0], rand[1], sign);
}

// normal with fields evaluation
function strategyHard(board: BoardT, sign: Sign): BoardT {
  const moves = possibleMoves(board);

  // check for win
  const win = winningMoves(board, moves, sign); 

  if (win.length !== 0) {
    return win[0];
  }

  // check for blocks
  const block = blockMoves(board, moves, sign); 

  if (block.length !== 0) {
    return block[0];
  }

  // best evaluation move with slight randomization
  const evaled = moves.map(x => {
    return {...x, evaluation: cellEvaluation(board.length, x.row, x.col, sign)}
  }).sort((x, y) => y.evaluation - x.evaluation);
  const randomIndex = Math.floor(Math.random() * (2 > evaled.length ? 1 : 2));
  const move =  evaled[randomIndex];

  return boardChange(board, move.row, move.col, sign);
}

export { playMove };