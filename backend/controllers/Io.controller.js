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

  // Make the volunteer join a room based on their email
  socket.on("registerVolunteer", (email) => {
    
    socket.join(email.email);  // This creates a room with the email as the room name
    console.log(`Volunteer joined room: ${email}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
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
