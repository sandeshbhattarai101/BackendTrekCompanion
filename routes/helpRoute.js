const router = require("express").Router();

const{createHelp} = require("../controller/admin/help/helpController");
const isAuthenticated = require("../middleware/isAuthenticated");
const catchAsync = require("../services/catchAsync");

router.route("/addHelp").post(isAuthenticated, catchAsync(createHelp))

module.exports = router