module.exports = (socket, io) => {
    // Event for volunteers to join the `volunteers` room
    socket.on("registerAsVolunteer", () => {
      socket.join("volunteers");
      console.log(`Socket ${socket.id} joined the 'volunteers' room`);
    });
  };
  