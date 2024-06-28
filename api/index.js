const express = require("express");
const {  mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("MongoDb connected")
}).catch((error)=>{
    console.log(error)
})
app.get('/',(req,res)=>{
    res.send("hello")
})
app.listen(3000,()=>{
    console.log("Server is running ");
})