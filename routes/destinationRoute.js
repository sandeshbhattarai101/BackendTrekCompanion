const { createDestination, renderDestination} = require("../controller/admin/destination/destinationController")
const isAuthenticated = require("../middleware/isAuthenticated")
const restrictTo = require("../middleware/restrictTo")

const router = require("express").Router()
const {multer, storage} =require("../middleware/multerConfig")
const upload = multer({storage : storage})

router.route("/destination").get(renderDestination).post(isAuthenticated, restrictTo("admin"), upload.single('destinationImage'), createDestination)





module.exports = router