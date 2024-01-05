
const { getGuide, getGuides} = require("../controller/guide/guideController")
const catchAsync = require("../services/catchAsync")

const router = require("express").Router()

router.route("/guides").get(catchAsync(getGuides))
router.route("/guides/:id").get(catchAsync(getGuide))

module.exports = router