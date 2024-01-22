import { Socket } from 'socket.io-client';
import Iplayer from './Iplayer';
import Iplayers from './Iplayers';

export default interface IAppContextProps {
  player: Iplayer;
  setPlayer: React.Dispatch<React.SetStateAction<Iplayer>>;
  chatName: string;
  setChatName: React.Dispatch<React.SetStateAction<string>>;
  playersInLobby: Iplayer[];
  setPlayersInLobby: React.Dispatch<React.SetStateAction<Iplayer[]>>;
  playersInGame: Iplayer[];
  setPlayersInGame: React.Dispatch<React.SetStateAction<Iplayer[]>>;
  socket: Socket;
  setSocket: React.Dispatch<React.SetStateAction<Socket>>;
}