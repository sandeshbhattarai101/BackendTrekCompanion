const router = require("express").Router()
const { getChats, getChat } = require("../controller/chat/chatController")
const catchAsync = require("../services/catchAsync")


//Routes Here
router.route("/api/chat").get(catchAsync(getChats))
router.route("/api/chat/:id").get(catchAsync(getChat))
