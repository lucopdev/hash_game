'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import { io, Socket } from 'socket.io-client';
import Iplayer from '@/interfaces/Iplayer';

interface AppProviderProps {
  children: ReactNode;
}

const ENDPOINT = 'http://hash.silvergames.com.br:40001';
const newSocket = io(ENDPOINT);

function AppProvider({ children }: AppProviderProps) {
  const [socket, setSocket] = useState<Socket | any>(null);
  const [chatName, setChatName] = useState<string>('');
  const [playersInGame, setPlayersInGame] = useState<Iplayer[]>([]);
  const [playersInLobby, setPlayersInLobby] = useState<Iplayer[]>([]);
  const [player, setPlayer] = useState<Iplayer>({
    id: '',
    playerNumber: 0,
    username: '',
    points: 0,
    sequence: [],
    mark: '',
  });

  const fetchSocket = () => {
    try {
      setSocket(newSocket);
    } catch (e) {
      return { message: 'Socket Server is not ready.' };
    }
  };

  useEffect(() => {
    fetchSocket();
  }, [setSocket]);

  const values = useMemo(
    () => ({
      player,
      setPlayer,
      chatName,
      setChatName,
      playersInLobby,
      setPlayersInLobby,
      playersInGame,
      setPlayersInGame,
      socket,
      setSocket,
    }),
    [
      player,
      setPlayer,
      chatName,
      setChatName,
      playersInLobby,
      setPlayersInLobby,
      playersInGame,
      setPlayersInGame,
      socket,
      setSocket,
    ]
  );

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default AppProvider;
