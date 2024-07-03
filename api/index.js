const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user.route");
const authRoutes = require('./routes/auth.route');
const postRoutes = require('./routes/post.route');
const commentRoutes = require('./routes/comment.route');
const connectDB = require("./dbConfig/connectDb");
const cookieParser = require("cookie-parser");
const path = require('path');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

// Static files (assuming client/dist folder)
app.use(express.static(path.join(__dirname, 'mern-blog', 'client', 'dist')));

// Serve index.html for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'mern-blog', 'client', 'dist', 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  
  res.status(statusCode).json({
    success: false,
    message
  });
});

// Start server and connect to database
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log("Server is running on port " + PORT);
  } catch (error) {
    console.error("Error connecting to database:", error.message);
  }
});
