const router = require("express").Router();

const{createHelp} = require("../controller/admin/help/helpController")

router.route("/addHelp").post(createHelp)

module.exports = router