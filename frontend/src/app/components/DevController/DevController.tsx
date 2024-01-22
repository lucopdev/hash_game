import AppContext from '@/context/AppContext';
import IAppContextProps from '@/interfaces/IAppContextProps';
import React, { useContext } from 'react';

function DevController(props: any) {
  const { throwDisplayMessage } = props;
  const { socket, chatName, player, setPlayer, playersInGame, setPlayersInGame } =
    useContext<IAppContextProps>(AppContext as React.Context<IAppContextProps>);

  const handleResetGame = () => {
    socket.emit('resetBoard');
  };

  const handleResetPoints = () => {
    socket.emit('resetPoints');
  };

  const handleShowPosition = () => {
    console.log(`posições do player ${JSON.stringify(player)}`);
    throwDisplayMessage(`posições do player ${JSON.stringify(player.sequence)}`);
  };

  return (
    <div className="flex flex-col justify-center items-center hidden">
      {/* hidden ao liberar o jogo */}
      <h1 className="text-[10px] m-2">CONTROLE DO DESENVOLVEDOR</h1>
      <div className="flex flex-col h-[70px] w-[210px] justify-center items-center border-2 rounded-t-[15px] rounded-b-[70px] mb-2">
        <div></div>

        <div className="flex">
          <button
            className="m-[2px] h-[50px] w-[60px] rounded-l-[20px] border-2 rounded-bl-[50px] transition-transform transform active:scale-95 focus:outline-none focus:ring focus:border-green-300 bg-green-500 hover:bg-green-600 text-white text-sm font-bold text-[12px]"
            onClick={handleResetGame}
          >
            Reset Board
          </button>
          <button
            onClick={handleResetPoints}
            className="m-[2px] h-[50px] w-[60px] border-2 rounded-[10px] transition-transform transform active:scale-95 focus:outline-none focus:ring focus:border-green-300 bg-green-500 hover:bg-green-600 text-white text-sm font-bold text-[12px]"
          >
            Reset Points
          </button>
          <button
            className="m-[2px] h-[50px] w-[60px] rounded-r-[20px] border-2 rounded-br-[50px] transition-transform transform active:scale-95 focus:outline-none focus:ring focus:border-green-300 bg-green-500 hover:bg-green-600 text-white text-sm font-bold text-[12px]"
            onClick={handleShowPosition}
          >
            Player Moves
          </button>
        </div>
      </div>
    </div>
  );
}

export default DevController;
