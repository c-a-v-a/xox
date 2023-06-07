import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Board from '../components/Board';
import WinModal from '../components/WinModal';

import { Turn, checkDraw } from '../controlers/board';
import { loadSettings } from '../controlers/settings';
import { Cell, newBoard, boardChange, isBoardEmpty, checkWin } from '../controlers/board';
import { randomPlayers } from '../controlers/player';

function TwoPlayers() {
  const settings = loadSettings();
  const navigation = useNavigate();
  
  // game state
  const [players, setPlayers] = useState(randomPlayers(settings.firstPlayerName, settings.secondPlayerName));
  const [board, setBoard] = useState(newBoard());
  const [turn, setTurn] = useState(Cell.X as Turn);

  // modal state
  const [gameWon, setGameWon] = useState(false);
  const [draw, setDraw] = useState(false);

  const changeTurn = () => setTurn(turn === Cell.X ? Cell.O : Cell.X);

  const cellClick = (x: number, y: number) => {
    if (board[x][y] !== Cell.Empty) {
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

  return (
    <>
      <div className="w-3/4 lg:w-1/2 flex flex-row justify-between items-center">
        <h1 className="text-white text-sm md:text-xl">
          X's: {players[0]}
        </h1>
        <h1 className="text-white text-sm md:text-xl">
          O's: {players[1]}
        </h1>
      </div>
      <div className="w-3/4 lg:w-1/2 flex flex-row justify-center items-center my-5">
        <h1 className="text-cyan-200 text-center text-xl md:text-3xl">
          current turn: {players[turn - 1]}
        </h1>
      </div>
      <Board board={board} action={cellClick}/>
      <WinModal
        visible={gameWon}
        player={Cell.X === turn ? players[0] : players[1]}
        draw={draw}
        botWin={false}
        again={() => {
          setPlayers([players[1], players[0]]);
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

export default TwoPlayers;