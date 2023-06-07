interface Props {
  visible: boolean
  player: string;
  draw: boolean;
  botWin: boolean;
  again: () => void;
  menu: () => void;
}

function WinModal(props: Props) {
  return (
    <div className={`${props.visible ? '' : 'hidden'} fixed flex justify-center items-center left-0 top-0 z-[1055] h-screen w-screen overflow-y-auto overflow-x-hidden outline-none bg-gray-900/50`}>
      <div className="flex flex-col justify-between bg-gray-800 m-5 w-full sm:w-2/3 lg:w-1/4 h-1/2 sm:h-1/3 rounded-2xl border-2 border-gray-700 overflow-y-hidden overflow-x-hidden">
        <div className="bg-gray-900 w-full p-5 rounded flex justify-center">
          <h1 className="text-cyan-200 text-2xl">{props.draw ? `game ended with a draw` : `${props.player} has won the game`}</h1>
        </div>
        <div className="w-full p-5 rounded">
          <h1 className="text-white text-xl">will add some banter here</h1>
        </div>
        <div className="bg-gray-900 w-full rounded flex justify-around items-center p-4">
          <button 
            onClick={props.again} 
            className="p-2 text-md sm:text-xl bg-cyan-200 rounded-md font-semibold hover:bg-cyan-100 transition-colors duration-300">
            play again
          </button>
          <button 
            onClick={props.menu} 
            className="p-2 text-md sm:text-xl bg-transparent border-2 border-cyan-200 text-cyan-200 rounded-md font-semibold hover:border-cyan-100 hover:text-cyan-100 transition-colors duration-300">
            go to menu
          </button>
        </div>
      </div>
    </div>
  );
}

export default WinModal;