const express=require("express")
const cors=require("cors")
require("dotenv").config()

const app=express()


const corsoption={
    origin:"*"
}

app.use(cors(corsoption))


app.listen(process.env.PORT,()=>{
    console.log(`App listening in port ${process.env.PORT}`)
})
