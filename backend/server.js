// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const setupWebSocket = require('./controllers/Io.controller');
// require("dotenv").config();

// const app = express();
// app.use(express.json());

// setupWebSocket(app);

// // CORS setup with multiple allowed origins if needed
// const corsOptions = {
//   origin: "http://localhost:3000",  // Frontend URL
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true,  // Allow cookies and authorization headers
// };

// // Apply CORS middleware
// app.use(cors(corsOptions));

// mongoose.connect(process.env.MONGO_URL);
// const db = mongoose.connection;

// db.on("error", () => {
//   console.log("Error on connecting mongodb");
// });

// db.once("open", () => {
//   console.log("MongoDB connected successfully");
// });

// // Include route files
// require("./routes/volunteer.route")(app);
// require("./routes/restaurant.route")(app);

// app.listen(process.env.PORT, () => {
//   console.log(`App listening on port ${process.env.PORT}`);
// });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
const setupWebSocket = require('./controllers/Io.controller');
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

// Set up HTTP server and WebSocket
const server = http.createServer(app);
setupWebSocket(server);

server.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
