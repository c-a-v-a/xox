import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Turn } from '../controlers/board';

import { loadSettings } from '../controlers/settings';
import { Cell, newBoard, boardChange, isBoardEmpty, checkWin, checkDraw, oppositeSign } from '../controlers/board';
import { randomPlayer } from '../controlers/player';
import { playMove } from '../controlers/bot';

import Board from '../components/Board';
import WinModal from '../components/WinModal';

function SinglePlayer() {
  const settings = loadSettings();
  const navigation = useNavigate();
  const botName = `AI ${settings.botName}`;
  
  // game state
  const [player, setPlayer] = useState(randomPlayer())
  const [board, setBoard] = useState(newBoard());
  const [turn, setTurn] = useState(Cell.X as Turn);

  // modal state
  const [gameWon, setGameWon] = useState(false);
  const [draw, setDraw] = useState(false);

  const changeTurn = () => setTurn(turn === Cell.X ? Cell.O : Cell.X);

  const cellClick = (x: number, y: number) => {
    if (board[x][y] !== Cell.Empty || turn !== player) {
      return;
    }

    setBoard(boardChange(board, x, y, turn));
  }

  useEffect(() => {
    if (isBoardEmpty(board)) {
      return;
    }

    if (checkWin(board, turn)) {
      setGameWon(true);
      return;
    }
      
    if (checkDraw(board)) {
      setGameWon(true);
      setDraw(true);
    } else {
      changeTurn();
    }
  }, [board]);

  useEffect(() => {
    if (turn === player) {
      return;
    }

    const sign = oppositeSign(player);

    setTimeout(() => {
      setBoard(playMove(board, sign, settings.botDifficulty));
    }, 1500);
  }, [turn, player])

  return (
    <>
      <div className="w-3/4 lg:w-1/2 flex flex-row justify-between items-center">
        <h1 className="text-white text-sm md:text-xl">
          X's: {player === Cell.X ? settings.firstPlayerName : botName}
        </h1>
        <h1 className="text-white text-sm md:text-xl">
          O's: {player === Cell.O ? settings.firstPlayerName : botName}
        </h1>
      </div>
      <div className="w-3/4 lg:w-1/2 flex flex-row justify-center items-center my-5">
        <h1 className="text-cyan-200 text-center text-xl md:text-3xl">
          current turn: {player === turn ? settings.firstPlayerName : botName}
        </h1>
      </div>
      <Board board={board} action={cellClick}/>
      <WinModal 
        visible={gameWon}
        player={player === turn ? settings.firstPlayerName : botName}
        draw={draw}
        botWin={!draw && player !== turn}
        again={() => {
          setPlayer(oppositeSign(player))
          setBoard(newBoard);
          setDraw(false);
          setGameWon(false);    
          setTurn(Cell.X);
        }}
        menu={() => navigation('/')}
      />
    </>
  );
}

export default SinglePlayer;