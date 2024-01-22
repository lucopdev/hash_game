import React, { useContext, useEffect } from 'react';
import DevController from '../DevController/DevController';
import IAppContextProps from '@/interfaces/IAppContextProps';
import AppContext from '@/context/AppContext';
import GetUpButton from '../GetUpButton/GetUpButton';
import '@components/PlayersPanel/playersPanel.css';

export default function PlayersPanel(props: any) {
  const { throwDisplayMessage } = props;
  const { playersInGame } = useContext<IAppContextProps>(
    AppContext as React.Context<IAppContextProps>
  );

  return (
    <div className="panel-main flex flex-col self-start w-[100%] items-center">
      <div className="panel-main-outer w-[100%] h-[150px] flex flex-col justify-between items-center border-4 rounded mt-[30%]">
        <h1 className="font-bold">In-game:</h1>
        <div className="player-display-outer flex flex-col justify-center items-center mb-[20px]">
          {playersInGame.map((player, index) => (
            <div
              className="player-display flex items-center w-[100%] justify-start bg-green-500 pl-[5px] m-2 border"
              key={index}
            >
              <span className="text-red-500 text-[20px]">{`${
                player.playerNumber === 1 ? 'X' : 'O'
              }`}</span>
              <span>{` - ${player.username}`}</span>
            </div>
          ))}
        </div>
      </div>
      <GetUpButton />
      <DevController throwDisplayMessage={throwDisplayMessage} />
    </div>
  );
}
