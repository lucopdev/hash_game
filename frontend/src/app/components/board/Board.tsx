/**
 * Nome do Programa: Board.tsx
 * Descrição: Componente que cria mesa de jogo onde os jogadores fazem suas jogadas.
 * Autor: Lucas Rosa
 * Data de Criação: 10 de janeiro de 2024
 * Versão: 0.0.1
 */

import Score from '../score/Score';
import { useState, useContext, useEffect, useReducer } from 'react';
import AppContext from '@/context/AppContext';
import IAppContextProps from '@/interfaces/IAppContextProps';
import Chat from '../chat/Chat';
import Iplayer from '@/interfaces/Iplayer';
import PlayersPanel from '../PlayersPanel/PlayersPanel';
import throwDisplayMessage from '@/utils/throwDisplayMessage';

export default function Board() {
  const [displayMessage, setDisplayMessage] = useState('');

  const { socket, chatName, player, setPlayer, playersInGame } = useContext<IAppContextProps>(
    AppContext as React.Context<IAppContextProps>
  );

  useEffect(() => {
    const playerByName = playersInGame.find((player: Iplayer) => player.username === chatName);
    playerByName && setPlayer(playerByName);

    if (socket) {
      socket.on('recivedMove', makeMove);

      return () => {
        socket.offAny();
      };
    }
  }, [socket, player, playersInGame]);

  useEffect(() => {
    if (socket) {
      socket.on('recivedLoginMessage', (data) => {
        throwDisplayMessage(setDisplayMessage, data.message);
      });

      return () => {
        socket.offAny();
      };
    }
  }, []);

  const makeDiv = (nSquares: number) => {
    let div = [];
    for (let i = 0; i < nSquares; i += 1) {
      div.push(
        <div
          onClick={(event) => sendTarget(event)}
          key={i}
          className="squares not-checked square p-0 m-0 square w-20 h-20 border-2 border-white bd-green-500"
          id={`${i + 1}`}
        ></div>
      );
    }
    return div;
  };

  const sendTarget = (event: React.MouseEvent<HTMLDivElement>): void => {
    const target = event?.target as HTMLElement;

    if (target && !(target.innerHTML.length > 0)) {
      socket?.emit('makeMove', {
        id: Number(target.id),
        innerHTML: player.mark,
        class: 'checked',
        playerId: player.id,
      });
    }
  };

  const makeMove = (targetData: { id: number; innerHTML: string; class: string }) => {
    const squares = document.querySelectorAll('.square');
    const targetSquare = Array.from(squares).find((square) => Number(square.id) === targetData.id);

    if (targetSquare) {
      targetSquare.innerHTML = targetData.innerHTML;
      targetSquare.classList.remove('not-checked');
      targetSquare.classList.add(targetData.class);
    }
  };

  return (
    <div className="board-main flex border-8 rounded-2xl items-center justify-center w-[800px] h-fit bg-blue-500 shadow-inner">
      <div className="board-main-outer flex flex-row w-[100%]">
        <div className="board-chat-outer">
          <Chat />
        </div>
        <div className="board-main-inner-contaniner flex flex-col w-[100%] justify-center items-center">
          <h1 className="flex justify-center text-center font-bold h-[30px] w-[100%]">{displayMessage}</h1>
          <div className="board-main-inner flex w-[100%] justify-around h-[100%] items-center">
            <div className="board-outer flex flex-col w-[60%] h-[100%] items-center justify-center">
              <div className="board-inner flex flex-col items-center justify-center">
                <div className="board box-border m-5 flex flex-wrap items-center justify-center w-60 h-fit">
                  {makeDiv(9)}
                </div>
                <Score />
              </div>
            </div>
            <div className="players-panel flex flex-row self-start w-[40%] mt-[5%] mr-[30px]">
              <PlayersPanel throwDisplayMessage={throwDisplayMessage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
