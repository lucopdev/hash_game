/**
 * Nome do Programa: WaitingRoom.tsx
 * Descrição: Cria o lobby onde os jogadores esperam para entrar nas salas.
 * Autor: Lucas Rosa
 * Data de Criação: 10 de janeiro de 2024
 * Versão: 0.0.1
 */

'use client';

import AppContext from '@/context/AppContext';
import IAppContextProps from '@/interfaces/IAppContextProps';
import IroomStatus from '@/interfaces/IroomStatus';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import './waitingroom.css';

export default function WaitingRoom() {
  const router = useRouter();
  const [roomStatus, setRoomStatus] = useState<IroomStatus>({
    success: true,
    user: '',
    message: '',
  });
  const [displayMessage, setDisplayMessage] = useState<string>('');
  const { socket, chatName, setChatName, playersInGame, setPlayersInGame } =
    useContext<IAppContextProps>(AppContext as React.Context<IAppContextProps>);

  useEffect(() => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      if (cookie.includes('player')) {
        const player = JSON.parse(cookie.split('=')[1]);
        setChatName(player.username);
      }
    }

    if (socket) {
      socket.on('joinAttempt', (data) => {
        setRoomStatus(data);
      });
      socket.on('updatePlayers', (players) => {
        setPlayersInGame(players);
      });
    }
  }, [socket, playersInGame, roomStatus]);

  const handleEnterRoom = (numberRoom: number) => {
    if (playersInGame.length >= 2) {
      router.push('/waitingroom');
    }

    if (socket) {
      socket.emit('joinRoom', { id: socket.id, username: chatName });
      socket.on('joinAttempt', (data) => {
        setRoomStatus(data);
      });

      if (roomStatus.success && playersInGame.length < 2) {
        socket.on('updatePlayers', (players) => {
          setPlayersInGame(players);
        });
      } else {
        router.push('/waitingroom');
      }

      playersInGame.length < 2 && router.push(`/table/${numberRoom}`);

      return () => {
        socket.offAny();
      };
    }
  };

  const displayRooms = () => {
    const numberOfRooms = 1;
    const roomComponent = [];
    for (let i = 1; i <= numberOfRooms; i += 1) {
      roomComponent.push(
        <div>
          <button
            className="w-[200px] h-[150px] m-2 bg-blue-500 border rounded-lg"
            onClick={() => handleEnterRoom(i)}
          >
            {`Enter Room ${i}`}
          </button>
        </div>
      );
    }
    return roomComponent;
  };

  const showIngamePlayers = () => {
    console.log(playersInGame);
  };

  const logoutFunc = () => {
    router.push('/register');
  };

  return (
    <div className="waitingroom w-screen h-screen pt-[100px] flex flex-col items-center overflow-x-hidden">
      <h1 className="font-bold text-[20px] pb-[20px]">Lobby</h1>
      <h1 className="flex justify-center items-center w-[500px] h-[50px]">{displayMessage}</h1>

      {/* AREA DE DESENVOLVIMENTO */}
      <div className="flex flex-col justify-center items-center border-2 rounded p-2 hidden">
        <h1>backend data:</h1>
        <div className="flex p-2">
          <button
            className={'w-[100px] h-[60px] text-[12px] p-2 m-2 bg-green-500'}
            onClick={showIngamePlayers}
          >
            players in-game
          </button>
        </div>
      </div>
      {/* AREA DE DESENVOLVIMENTO */}

      <div className="flex flex-row h-fit">
        <div className="flex flex-wrap m-5 max-w-[700px] items-center justify-center h-fit">
          {displayRooms().map((room, i) => (
            <div key={i}>{room}</div>
          ))}
        </div>
      </div>
      <button onClick={logoutFunc} className="border p-2 rounded">
        Logout
      </button>
    </div>
  );
}
