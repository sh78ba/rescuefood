const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const bodyParser = require("body-parser");
require("dotenv").config()

const app=express()


const corsOptions = {
    origin: "http://localhost:3000", // Allow frontend running on localhost:3000
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow necessary HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow required headers
    credentials: true, // Allow cookies or other credentials
  };

app.use(cors(corsOptions))
app.use(express.json());


mongoose.connect(process.env.MONGO_URL)
const db=mongoose.connection

db.on("error",()=>{
    console.log("Error on connecting mongodb")
})

db.once("open",()=>{
    console.log("MongoDB connected successfully")
})



require("./routes/volunteer.route")(app)
require("./routes/restaurant.route")(app)


app.listen(process.env.PORT,()=>{
    console.log(`App listening in port ${process.env.PORT}`)
})
