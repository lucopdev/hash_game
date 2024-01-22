import dotenv from 'dotenv';
import { app } from './app';
import { corsOptions } from './utils/corsConfig';
import { Socket } from 'socket.io';
import Iplayer from './interfaces/Iplayer';

dotenv.config();

const http = require('http').createServer(app);
const port = process.env.PORT || 40001;
const io = require('socket.io')(http, {
  cors: corsOptions,
});

const WINNINGS = [
  [1, 2, 3], // horizontal
  [4, 5, 6], // horizontal
  [7, 8, 9], // horizontal
  [1, 4, 7], // vertical
  [2, 5, 8], // vertical
  [3, 6, 9], // vertical
  [1, 5, 9], // diagonal
  [3, 5, 7], // diagonal
];

const players: Iplayer[] = [];
let currentTurn = 1;
let hasVictory = false;

const resetBoard = () => {
  for (let i = 0; i < 9; i += 1) {
    io.emit('recivedMove', {
      id: i + 1,
      innerHTML: '',
      class: 'not-checked',
    });

    players.forEach((player) => (player.sequence = []));
  }
};

const resetPoints = () => {
  players.forEach((player) => (player.points = 0));

  io.emit('updatePlayers', players);
};

const resetSequence = () => {
  players.forEach((player) => (player.sequence = []));

  io.emit('updatePlayers', players);
};

const disconnectRoom = (socket: Socket) => {
  if (players.find(player => player.id === socket.id)) {
    const playerIndex = players.findIndex((player) => player.id === socket.id);
    players.splice(playerIndex, 1);
    resetBoard();
    resetPoints();
    resetSequence();
  }
};

io.on('connection', (socket: Socket) => {
  console.log(`New player conected: ${socket.id}`);

  socket.on('joinRoom', (data: { id: string; username: string }) => {
    if (players.length < 2 && !players.find((player) => player.username === data.username)) {
      players.push({
        id: socket.id,
        username: data.username,
        playerNumber: !players.some((player) => player.playerNumber === 1) ? 1 : 2,
        points: 0,
        sequence: [],
        mark: !players.some((player) => player.mark === 'X') ? 'X' : 'O',
      });

      io.emit('joinAttempt', { success: true, user: data.username, message: 'Loading...'});
      io.emit('updatePlayers', players);
    } else {
      socket.emit('joinAttempt', {
        success: false,
        user: data.username,
        message: 'The room is full or player already in game.',
      });
    }
  });

  socket.on('makeMove', (move: any) => {
    const currentPlayer = players.find((player) => player.id === move.playerId);

    if (players.length > 1 && currentTurn === currentPlayer?.playerNumber) {
      console.log(`User make move ${socket.id}`);

      io.emit('recivedMove', move);

      if (currentPlayer) {
        currentPlayer.sequence.push(move.id);
        currentPlayer.sequence.sort();

        hasVictory = WINNINGS.some((winning) =>
          winning.every((number) => currentPlayer.sequence.sort().includes(number))
        );

        if (hasVictory) {
          currentPlayer.points += 1;
          players[0].sequence = [];
          players[1].sequence = [];
          hasVictory = false;
          resetBoard();
        }

        io.emit('updatePlayers', players);
      }

      currentTurn = currentTurn === 1 ? 2 : 1;
      io.emit('currentTurn', currentTurn);
    }

    players.some((player) => player.sequence.length > 4) && resetBoard();
  });

  socket.on('resetBoard', resetBoard);

  socket.on('resetPoints', resetPoints);

  socket.on('message', (message: string) => {
    console.log(`User send message ${socket.id}`);
    console.log(`\nplayers in-game - ${players.map((player) => ` ${player.username}`)}\n`);
    io.emit('recivedMessage', message);
  });

  socket.on('disconnectRoomFunction', () => {
    disconnectRoom(socket);
  });

  socket.on('disconnect', () => {
    disconnectRoom(socket);

    io.emit('updatePlayers', players);
  });
});

http.listen(port, () => {
  console.log(`server running on port ${port}`);
});
