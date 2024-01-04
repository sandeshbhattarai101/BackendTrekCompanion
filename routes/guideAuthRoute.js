
const { registerGuide, loginGuide, forgotPassword, verifyOtp, resetPassword} = require("../controller/auth/guideAuthController")
const catchAsync = require("../services/catchAsync")

const router = require("express").Router()

//Routes Here
router.route("/registerguide").post(catchAsync(registerGuide))
router.route("/loginguide").post(catchAsync(loginGuide))
router.route("/forgotPassword").post(catchAsync(forgotPassword))
router.route("/verifyOtp").post(catchAsync(verifyOtp))
router.route("/resetPassword").post(catchAsync(resetPassword))



module.exports = router