const express = require("express")
const router = express.Router()
const {
    getSellerNotifications
} = require("../controllers/notification")

router.get("/seller/notification/:sellerId",getSellerNotifications)

module.exports = router