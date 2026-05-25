"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIo = exports.initSocket = void 0;
let io;
const initSocket = (serverIo) => {
    io = serverIo;
    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);
        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
};
exports.initSocket = initSocket;
const getIo = () => {
    if (!io) {
        throw new Error('Socket.io not initialized');
    }
    return io;
};
exports.getIo = getIo;
