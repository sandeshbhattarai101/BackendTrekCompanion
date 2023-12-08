const router = require("express").Router();

const{createHelp} = require("../controller/admin/help/helpController");
const isAuthenticated = require("../middleware/isAuthenticated");

router.route("/addHelp").post(createHelp)

module.exports = router