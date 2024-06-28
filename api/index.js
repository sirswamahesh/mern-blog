const express = require("express");
const { mongoose } = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user.route");
const authRoutes = require('./routes/auth.route');
const connectDB = require("./dbConfig/connectDb");
dotenv.config();

const app = express();
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
