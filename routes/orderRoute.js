const { getMyOrders, createOrder, updateMyOrder, deleteMyOrder, cancelOrder } = require("../controller/user/order/orderController")
const isAuthenticated = require("../middleware/isAuthenticated")
const restrictTo = require("../middleware/restrictTo")
const catchAsync = require("../services/catchAsync")

const router = require("express").Router()


router.route("/api/orders/:id").post(isAuthenticated,restrictTo("tourist"),catchAsync(createOrder)).get(isAuthenticated,catchAsync(getMyOrders))
router.route("/api/orders/cancel").patch(isAuthenticated,catchAsync(cancelOrder))
router.route("/api/orders/:id").delete(isAuthenticated,catchAsync(deleteMyOrder))


module.exports = router