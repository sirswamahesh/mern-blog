const express = require("express");
const verifyToken = require("../utils/verifyUser");
const {createPost,getposts, deletepost,updatepost} = require("../controllers/post.controller");

const router = express.Router();

router.post('/create-post', verifyToken, createPost)
router.get('/getposts',getposts)
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost);
router.put('/updatepost/:postId/:userId', verifyToken, updatepost)


module.exports =  router;