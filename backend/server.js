
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
const {setupWebSocket} = require('./controllers/Io.controller');
const Volunteer=require("./models/Volunteer.model")
require("dotenv").config();

const app = express();
app.use(express.json());

// CORS setup with multiple allowed origins
const corsOptions = {
  origin: ["http://localhost:3000"], // Add other origins if necessary
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", () => {
  console.log("Error on connecting mongodb");
});

db.once("open", () => {
  console.log("MongoDB connected successfully");
});

// Include route files
require("./routes/volunteer.route")(app);
require("./routes/restaurant.route")(app);

const syncIndexes = async () => {
  try {
    await Volunteer.syncIndexes();
    console.log("✅ 2dsphere index created successfully!");
  } catch (error) {
    console.error("❌ Error creating index:", error);
  }
};

syncIndexes();




// Set up HTTP server and WebSocket
const server = http.createServer(app);
setupWebSocket(server);

server.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
