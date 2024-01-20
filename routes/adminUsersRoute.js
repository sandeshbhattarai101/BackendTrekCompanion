const { getGuides, getGuide } = require("../controller/admin/user/userController")
const isAuthenticated = require("../middleware/isAuthenticated")
const restrictTo = require("../middleware/restrictTo")
const catchAsync = require("../services/catchAsync")

const router = require("express").Router()

router.route('/guides').get(isAuthenticated, restrictTo('tourist'), catchAsync(getGuides) )
 router.route('/singleguide/:id').get(isAuthenticated, restrictTo('tourist'), catchAsync(getGuide) )



module.exports = router