const { createDestination } = require("../controller/admin/destination/destinationController")


const router = require("express").Router()


router.route("/destination").post(createDestination)






module.exports = router