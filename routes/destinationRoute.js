const { createDestination, renderDestination} = require("../controller/admin/destination/destinationController")


const router = require("express").Router()


router.route("/destination").post(createDestination)
router.route("/getDestination").get(renderDestination)






module.exports = router