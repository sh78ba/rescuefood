const { Server } = require('socket.io');
const Request = require('../models/RestaurantDonation.model');

// WebSocket Function
const setupWebSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // Frontend URL
      methods: ["GET", "POST"], // Allowed methods
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true, // Allow cookies/auth headers
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected',socket.id);

    //register as volunteer

    socket.on("registerAsVolunteer",()=>{
      socket.join("volunteers");
      console.log(`Socket ${socket.id} joined the 'volunteers' room`);
    })

    // Real-time data fetch and send
    const sendLiveData = async () => {
      try {
        // Fetch data where status is 'requested'
        const data = await Request.find({ status: 'requested' });
        
        // Send the structured data to the client
        socket.emit('update', data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    // Periodically send data
    const interval = setInterval(sendLiveData, 5000);

    // Listen for disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected',socket.id);
      clearInterval(interval); // Clear interval to prevent memory leaks
    });
  });

  return io;
};

module.exports = setupWebSocket;


module.exports = (socket, io) => {
  // Event for volunteers to register
  socket.on("registerAsVolunteer", () => {
    registerVolunteer(socket);
  });
};