import BoardCell from '../components/BoardCell';

import { BoardT } from '../controlers/board';

interface Props {
  board: BoardT;
  action: (x: number, y: number) => void
}

function Board(props: Props) {
  return (
    <div className='grid grid-cols-3 grid-rows-3 mt-10 w-2/3 aspect-square md:w-1/2 lg:w-1/4'>
      {props.board.map((xs, i) => xs.map((x, j) => <BoardCell key={`${i}-${j}`} value={x} action={() => props.action(i, j)}/>))}
    </div>
  )
}

export default Board;