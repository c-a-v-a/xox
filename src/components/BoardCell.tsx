import { Cell } from '../controlers/board';

import OIcon from './icons/OIcon';
import XIcon from './icons/XIcon';

interface Props {
  value: Cell;
  action: () => void;
}

function BoardCell(props: Props) {
  const matchValue = (x: Cell) => {
    if (x === Cell.X) {
      return <XIcon />
    } else if (x === Cell.O) {
      return <OIcon />
    } else {
      return <></>
    }
  }
  
  return(
    <div onClick={props.action} className='w-full h-full p-0.5 sm:p-1'>
      <div className='w-full h-full bg-gray-700 rounded-md p-3 flex justify-center items-center'>
        {matchValue(props.value)}
      </div>
    </div>
  );   
}

export default BoardCell;