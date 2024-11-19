const { Server } = require("socket.io");
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
});

const activeUsers = new Map();

const getReceiverSocketId = (receiverId) => {
  const user = activeUsers.get(receiverId);
  return user ? user.socketId : null;
}

const cleanupInterval = setInterval(() => {
  const now = Date.now();
  for (const [userId, userData] of activeUsers.entries()) {
    if (now - userData.timestamp > 1000 * 60 * 60) { 
      console.log(`Cleaning up inactive user: ${userId}`);
      activeUsers.delete(userId);
    }
  }
}, 1000 * 60 * 30);

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (!userId || userId === "undefined") {
    console.log("Connection attempted without valid userId");
    socket.disconnect(true);
    return;
  }

  const existingConnection = activeUsers.get(userId);
  if (existingConnection && existingConnection.socketId !== socket.id) {
    const existingSocket = io.sockets.sockets.get(existingConnection.socketId);
    if (existingSocket) {
      console.log(`Disconnecting previous connection for user ${userId}`);
      existingSocket.disconnect(true);
    }
  }

  activeUsers.set(userId, {
    socketId: socket.id,
    timestamp: Date.now()
  });

  console.log(`User connected - ID: ${userId}, Socket: ${socket.id}`);
  console.log("Active users:", Array.from(activeUsers.keys()));

  socket.on("disconnect", () => {
    console.log(`User disconnected - ID: ${userId}, Socket: ${socket.id}`);
    
    const userData = activeUsers.get(userId);
    if (userData && userData.socketId === socket.id) {
      activeUsers.delete(userId);
    }
    
    console.log("Remaining active users:", Array.from(activeUsers.keys()));
  });
});

process.on('SIGTERM', () => {
  clearInterval(cleanupInterval);
  io.close();
});

module.exports = { io, app, server, getReceiverSocketId };
