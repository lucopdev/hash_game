/**
 * Nome do Programa: Score.tsx
 * Descrição: Cria o placar com os pontos dos players.
 * Autor: Lucas Rosa
 * Data de Criação: 10 de janeiro de 2024
 * Versão: 0.0.1
 */
'use client';

import AppContext from '@/context/AppContext';
import IAppContextProps from '@/interfaces/IAppContextProps';
import Iplayer from '@/interfaces/Iplayer';
import { useContext, useEffect, useState } from 'react';
import '@components/score/score.css';

export default function Score() {
  const [scorePlayerOne, setScorePLayerOne] = useState<number>(0);
  const [scorePlayerTwo, setScorePLayerTwo] = useState<number>(0);
  const { socket } = useContext<IAppContextProps>(AppContext as React.Context<IAppContextProps>);

  useEffect(() => {
    if (socket) {
      socket.on('updatePlayers', (players) => {
        const player1 = players.find((player: Iplayer) => player.playerNumber === 1);
        const player2 = players.find((player: Iplayer) => player.playerNumber === 2);
        player1 && setScorePLayerOne(player1.points);
        player2 && setScorePLayerTwo(player2.points);
      });

      return () => {
        socket.offAny();
      };
    }
  }, [socket, scorePlayerOne, scorePlayerTwo]);

  return (
    <div className="score-main flex flex-row justify-center items-center mb-[20px]">
      <div className="flex flex-col w-28 h-24 items-center justify-center bg-blue-900 m-5 rounded">
        <h1 className="text-[10px] text-center">PLAYER ONE</h1>
        <p className="text-[30px]">{scorePlayerOne}</p>
      </div>
      <div className="flex flex-col w-28 h-24 items-center justify-center bg-green-900 m-5 rounded">
        <h1 className="text-[10px] text-center">PLAYER TWO</h1>
        <p className="text-[30px]">{scorePlayerTwo}</p>
      </div>
    </div>
  );
}
