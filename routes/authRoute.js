const { registerUser, loginUser } = require("../controller/auth/authcontroller")

const router = require("express").Router()

//Routes Here

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)



module.exports = router