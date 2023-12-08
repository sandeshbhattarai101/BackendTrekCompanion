const { createDestination, renderDestination} = require("../controller/admin/destination/destinationController")
const isAuthenticated = require("../middleware/isAuthenticated")
const restrictTo = require("../middleware/restrictTo")


const router = require("express").Router()


router.route("/destination").post(isAuthenticated, restrictTo("admin"), createDestination)
router.route("/getDestination").get(renderDestination)






module.exports = router