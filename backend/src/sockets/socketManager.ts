import { Server } from 'socket.io';

let io: Server;

export const initSocket = (serverIo: Server) => {
  io = serverIo;
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};

export const getIo = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};
