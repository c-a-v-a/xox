import { describe, test, assert } from 'vitest';

import { Cell, newBoard, checkWin, boardChange, isBoardEmpty, checkDraw } from './board';

describe('board controler tests', () => {
  test('create empty board', () =>{
    const b = newBoard();

    assert(b.length === 3);

    b.map(xs => assert(xs.length === 3));
    b.map(xs => xs.map(x => assert(x === Cell.Empty)));
  });

  test('winning conditions', () => {
    let b1 = [
      [Cell.X, Cell.X, Cell.X],
      [Cell.X, Cell.O, Cell.X],
      [Cell.Empty, Cell.X, Cell.O],
    ];

    let b2 = [
      [Cell.O, Cell.X, Cell.Empty],
      [Cell.X, Cell.O, Cell.X],
      [Cell.Empty, Cell.X, Cell.X],
    ];

    let b3 = [
      [Cell.O, Cell.X, Cell.X],
      [Cell.X, Cell.O, Cell.X],
      [Cell.Empty, Cell.X, Cell.O],
    ];

    let b4 = [
      [Cell.O, Cell.X, Cell.X],
      [Cell.X, Cell.O, Cell.X],
      [Cell.Empty, Cell.X, Cell.X],
    ];

    assert(checkWin(b1, Cell.X));
    assert(!checkWin(b1, Cell.O));

    assert(!checkWin(b2, Cell.X));
    assert(!checkWin(b2, Cell.O));

    assert(!checkWin(b3, Cell.X));
    assert(checkWin(b3, Cell.O));

    assert(checkWin(b4, Cell.X));
    assert(!checkWin(b4, Cell.O));
  });

  test('board change', () => {
    const board = newBoard();
    const changed = boardChange(board, 0, 0, Cell.X);

    assert(changed[0][0] === Cell.X);
  });

  test('empty board', () => {
    const board = newBoard();
    const changed = boardChange(board, 0, 0, Cell.X);

    assert(isBoardEmpty(board));
    assert(!isBoardEmpty(changed));
  });

  test('draw', () => {
    let b1 = [
      [Cell.O, Cell.X, Cell.X],
      [Cell.X, Cell.O, Cell.X],
      [Cell.Empty, Cell.X, Cell.X],
    ];

    let b2 = [
      [Cell.O, Cell.X, Cell.X],
      [Cell.X, Cell.O, Cell.O],
      [Cell.O, Cell.X, Cell.X],
    ];

    assert(!checkDraw(b1));
    assert(checkDraw(b2));
  });
})