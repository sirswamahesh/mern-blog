const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route');
const postRoutes = require('./routes/post.route');
const commentRoutes = require('./routes/comment.route');
const cookieParser = require('cookie-parser');
const path = require('path');
const connectDB=require('./dbConfig/connectDb.js')

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  try{
    connectDB();
    console.log('Server is running on port 3000!');
  }catch(error){
    console.log(error)
  }
  ;
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
