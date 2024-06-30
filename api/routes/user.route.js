const express =require("express");
const {updateUser,test} = require("../controllers/user.controller");

const  verifyToken  = require("../utils/verifyUser.js");

const router = express.Router()

router.get('/test',test)
router.put('/update/:userId',verifyToken ,updateUser )

module.exports= router;