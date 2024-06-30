const express = require("express");
const { mongoose } = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user.route");
const authRoutes = require('./routes/auth.route');
const connectDB = require("./dbConfig/connectDb");
const cookieParser = require("cookie-parser");
dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json())
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(3000, () => {
  try {
    // connection database
    connectDB();
    console.log("Server is running ");
  } catch (error) {
    console.log(error);
  }
});

app.use((error,req,res,next)=>{
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  
  res.status(statusCode).json({
    success:false,
    message
  })
})