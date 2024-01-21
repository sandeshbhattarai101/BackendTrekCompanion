const { initialKhaltiPayment, verifyPidx } = require("../controller/user/payment/paymentController")
const isAuthenticated = require("../middleware/isAuthenticated");
const catchAsync = require("../services/catchAsync");

const router = require("express").Router()



router.route("/payment").post(isAuthenticated, catchAsync(initialKhaltiPayment))
router.route("/payment/verify").post( catchAsync(verifyPidx))



module.exports = router


