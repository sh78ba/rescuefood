const { Server } = require("socket.io");

let io;

const setupWebSocket = (server) => {
  // Initialize WebSocket server
  io = new Server(server, {
    cors: {
      origin: ["https://rescuefoodfrontend.vercel.app"], // Match your frontend origin
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {


  // Make the volunteer join a room based on their email
  socket.on("registerVolunteer", (email) => {
    
    socket.join(email.email);  // This creates a room with the email as the room name
   
  });

  socket.on("disconnect", () => {
    
  });
});
}

const getIoInstance = () => {
  if (!io) {
    throw new Error("Socket.io is not initialized!");
  }
  return io;
};

// ✅ Correct way to export both functions
module.exports = { setupWebSocket, getIoInstance };
