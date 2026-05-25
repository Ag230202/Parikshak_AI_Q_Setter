import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const initSocketClient = () => {
  if (!socket) {
    socket = io('http://localhost:5000');
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    throw new Error('Socket not initialized');
  }
  return socket;
};
