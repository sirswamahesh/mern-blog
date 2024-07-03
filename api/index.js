const express = require("express");
const { mongoose } = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user.route");
const authRoutes = require('./routes/auth.route');
const postRoutes = require('./routes/post.route');
const commentRoutes = require('./routes/comment.route');
const connectDB = require("./dbConfig/connectDb");
const cookieParser = require("cookie-parser");
const path = require('path');
dotenv.config();
const __dirname = path.resolve();
const app = express();
app.use(cookieParser());
app.use(express.json())
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

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
