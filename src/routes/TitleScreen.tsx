import { useNavigate } from 'react-router-dom';

import PrettyButton from '../components/PerttyButton';

function TitleScreen() {
  const navigate = useNavigate();

  const buttonAction = (path: string) => {
    navigate(path);
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-4xl sm:text-7xl text-white font-bold">tic-tac-toe</h1>
      <div className="grid grid-rows-2 mt-5 mx-10">
        <PrettyButton action={() => buttonAction('/singleplayer')} text={"one player"} />
        <PrettyButton action={() => buttonAction('/two_players')} text={"two players"} />
        <PrettyButton action={() => buttonAction('/settings')} text={"settings"} />
      </div>
    </div>
  );
}

export default TitleScreen;
