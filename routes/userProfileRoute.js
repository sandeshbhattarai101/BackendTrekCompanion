const { getMyProfile, deleteMyProfile, updateMyProfile, updateMyPassword, allGuides, allTourists } = require("../controller/user/profile/profileController");
const isAuthenticated = require("../middleware/isAuthenticated");
const catchAsync = require("../services/catchAsync");

const router = require("express").Router()

router.route("/profile").get(isAuthenticated,catchAsync(getMyProfile)).delete(isAuthenticated,catchAsync(deleteMyProfile)).patch(catchAsync(updateMyProfile))

router.route("/profile/changePassword").patch(isAuthenticated,catchAsync(updateMyPassword))

//for chatting with guides

router.route("/api/chat/user").get(isAuthenticated,catchAsync(allGuides) )

router.route("/touristdata").get(isAuthenticated,catchAsync(allTourists) )

module.exports = router;