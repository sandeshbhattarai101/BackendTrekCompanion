const { createDestination, getDestinations, getDestination, deleteDestination, editDestination} = require("../controller/admin/destination/destinationController")
const isAuthenticated = require("../middleware/isAuthenticated")
const restrictTo = require("../middleware/restrictTo")

const router = require("express").Router()
const {multer, storage} =require("../middleware/multerConfig")
const catchAsync = require("../services/catchAsync")
const upload = multer({storage : storage})

router.route("/destinations").get(catchAsync(getDestinations)).post(isAuthenticated, restrictTo("admin"), upload.single('destinationImage'), catchAsync(createDestination) )

router.route("/destinations/:id").get( catchAsync(getDestination)).delete(isAuthenticated, catchAsync(deleteDestination)).patch(isAuthenticated,restrictTo("admin"), upload.single("destinationImage"), editDestination)


module.exports = router