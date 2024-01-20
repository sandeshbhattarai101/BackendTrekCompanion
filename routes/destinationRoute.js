const { createDestination, getDestinations, getDestination, deleteDestination, editDestination, allDestinations} = require("../controller/admin/destination/destinationController")

const {multer, storage} =require("../middleware/multerConfig")
const upload = multer({storage : storage})
const catchAsync = require("../services/catchAsync")
const isAuthenticated = require("../middleware/isAuthenticated")
const restrictTo = require("../middleware/restrictTo")
const router = require("express").Router()

router.route("/destinations").get( catchAsync(getDestinations)).post(isAuthenticated, restrictTo("admin"), upload.single('destinationImage'), catchAsync(createDestination) )

router.route("/destinations/:id").get(isAuthenticated, catchAsync(getDestination)).delete(catchAsync(deleteDestination)).patch(isAuthenticated,restrictTo("admin"), upload.single("destinationImage"), editDestination)

router.route("/api/tourist/destination").get(isAuthenticated, catchAsync(allDestinations) )


module.exports = router