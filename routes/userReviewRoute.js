const { getMyReviews, deleteReview, createReview, addGuideReview } = require("../controller/user/review/reviewController")

const isAuthenticated = require("../middleware/isAuthenticated")
const restrictTo = require("../middleware/restrictTo")
const catchAsync = require("../services/catchAsync")

const router = require("express").Router( )

// router.route("/reviews")
router.route("/reviews").get(isAuthenticated,catchAsync(getMyReviews))
router.route("/reviews/:id").delete(isAuthenticated,catchAsync( deleteReview)).post(isAuthenticated,restrictTo("tourist"),catchAsync(createReview))


module.exports = router