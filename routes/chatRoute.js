const router = require("express").Router()
const { fetchChats, getChat, accessChat } = require("../controller/chat/chatController")
const isAuthenticated = require("../middleware/isAuthenticated")
const catchAsync = require("../services/catchAsync")


//Routes Here
router.route("/api/chat").post(isAuthenticated, catchAsync(accessChat)).get(isAuthenticated, catchAsync(fetchChats))
// router.route("/api/chat/:id").get(catchAsync(getChat))


module.exports = router;