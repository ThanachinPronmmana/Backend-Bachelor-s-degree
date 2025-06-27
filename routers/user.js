const express = require("express")
const router = express.Router()
const {updateStatusSeller,deleteUser, listUserSeller,listUserBuyer} = require("../controllers/user")

router.put("/user/:id",updateStatusSeller)
router.post("/user/:id",deleteUser)
router.get("/userSeller",listUserSeller)
router.get("/userBuyer",listUserBuyer)

module.exports = router