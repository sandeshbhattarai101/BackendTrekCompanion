const { getGuides, getGuide } = require("../controller/admin/user/userController")
const isAuthenticated = require("../middleware/isAuthenticated")
const restrictTo = require("../middleware/restrictTo")

const router = require("express").Router()

router.route('/guides').get(isAuthenticated, restrictTo('tourist'), getGuides)
 router.route('/singleguide/:id').get(isAuthenticated, restrictTo('tourist'), getGuide)



module.exports = router