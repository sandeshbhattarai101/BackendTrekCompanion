const { deleteUser, getGuides } = require("../controller/admin/user/userController")
const isAuthenticated = require("../middleware/isAuthenticated")
const restrictTo = require("../middleware/restrictTo")

const router = require("express").Router()

router.route('/guides').get(isAuthenticated, restrictTo('tourist'), getGuides)
// router.route('/users/:id').delete(isAuthenticated, restrictTo('admin'), deleteUser)



module.exports = router