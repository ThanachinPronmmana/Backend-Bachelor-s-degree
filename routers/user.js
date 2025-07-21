const express = require("express")
const router = express.Router()
const { updateStatusSeller,
    deleteUser,
    listUserSeller,
    listUserBuyer,
    getUserProfile,
    updateUser
} = require("../controllers/user")

router.put("/user/:id", updateStatusSeller)
router.post("/user/:id", deleteUser)
router.get("/userSeller", listUserSeller)
router.get("/userBuyer", listUserBuyer)
router.get("/profile/:id", getUserProfile)
router.patch("/profile/:id",updateUser)
module.exports = router