const { Server } = require("socket.io");

let io;

const setupWebSocket = (server) => {
  // Initialize WebSocket server
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000"], // Match your frontend origin
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Example event listener
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

const getIoInstance = () => {
  if (!io) {
    throw new Error("Socket.io is not initialized!");
  }
  return io;
};

module.exports = setupWebSocket;
module.exports.getIoInstance = getIoInstance;
