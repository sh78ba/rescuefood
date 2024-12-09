const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
require("dotenv").config()

const app=express()


const corsoption={
    origin:"*"
}

app.use(cors(corsoption))

mongoose.connect(process.env.MONGO_URL)
const db=mongoose.connection

db.on("error",()=>{
    console.log("Error on connecting mongodb")
})

db.once("open",()=>{
    console.log("MongoDB connected successfully")
})



app.listen(process.env.PORT,()=>{
    console.log(`App listening in port ${process.env.PORT}`)
})
