type BoardT = Array<Array<Cell>>;
type Sign = Cell.X|Cell.O;
type Turn = Sign;

enum Cell {
  Empty,
  X,
  O
}

const BOARD_SIZE = 3;

function oppositeSign(sign: Turn): Turn {
  return sign === Cell.X ? Cell.O : Cell.X;
}

function newBoard(): BoardT {
  let board: BoardT = [];

  for (let i = 0; i < BOARD_SIZE; i++) {
    let row = [];

    for (let j = 0; j < BOARD_SIZE; j++) {
      row.push(Cell.Empty);
    }

    board.push(row)
  }

  return board;
}

function isEqual(x: Cell, y: Cell) {
  if (x === Cell.Empty || y === Cell.Empty) {
    return false;
  } else {
    return x === y;
  }
}

function rotate(board: BoardT): BoardT {
  let rotated: BoardT = [];

  for (let i = 0; i < board[0].length; i++) {
    let row = [];

    for (let j = 0; j < board.length; j++) {
      row.push(board[j][i]);
    }

    rotated.push(row);
  }

  return rotated;
}

function isRowEqual(xs: Array<Cell>, player: Sign): boolean {
  return xs.reduce((acc, x) => isEqual(player, x) && acc, true);
}

function boardChange(board: BoardT, x: number, y: number, cell: Cell): BoardT {
  return board.map((zs, i) => { 
    return zs.map((z,j) => { 
      if (i === x && j === y) {
        return cell;
      } else {
        return z;
      }
    });
  });
}

function isBoardEmpty (board: BoardT): boolean {
  const mapped = board.map(xs => xs.map(x => x === Cell.Empty));
  const reduced = mapped.map(xs => xs.reduce((acc, x) => x && acc, true));
  
  return reduced.reduce((acc ,x) => x && acc, true);
}

function horizontalCheck(board: BoardT, player: Sign): boolean {
  const mapped = board.map(xs => isRowEqual(xs ,player));
  return mapped.reduce((acc, x) => x || acc, false);
}

function verticalCheck(board: BoardT, player: Sign): boolean {
  let rotated = rotate(board);
  return horizontalCheck(rotated, player);
}

function diagonalCheck(board: BoardT, player: Sign): boolean {
  let leftDiagonal = [];
  let rightDiagonal = [];

  for (let i = 0; i < board.length; i++) {
    leftDiagonal.push(board[i][i]);
    rightDiagonal.push(board[i][board.length - 1 - i]);
  }

  return isRowEqual(leftDiagonal, player) || isRowEqual(rightDiagonal, player);
}

function checkWin(board: BoardT, player: Sign): boolean {
  return horizontalCheck(board, player) || verticalCheck(board, player) || diagonalCheck(board, player);
}

function checkDraw(board: BoardT): boolean {
  const mapped = board.map(xs => xs.map(x => x !== Cell.Empty));
  const reduced = mapped.map(xs => xs.reduce((acc, x) => x && acc, true));
  
  return reduced.reduce((acc ,x) => x && acc, true);
}

export type { BoardT, Turn, Sign };
export { Cell, newBoard, checkWin, boardChange, isBoardEmpty, checkDraw, oppositeSign };