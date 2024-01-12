const { registerUser, loginUser, forgotPassword, verifyOtp, resetPassword, logOut } = require("../controller/auth/authcontroller")
const isAuthenticated = require("../middleware/isAuthenticated")
const catchAsync = require("../services/catchAsync")

const router = require("express").Router()

//Routes Here

router.route("/register").post(catchAsync(registerUser))
router.route("/login").post(catchAsync(loginUser))
router.route("/logout").get( catchAsync(logOut))
router.route("/forgotPassword").post(catchAsync(forgotPassword))
router.route("/verifyOtp").post(catchAsync(verifyOtp))
router.route("/resetPassword").post(catchAsync(resetPassword))



module.exports = router