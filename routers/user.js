const express = require("express")
const router = express.Router()
const { 
    updateStatusSeller,
    deleteUser,
    listUserSeller,
    listUserBuyer,
    getUserProfile,
    updateUser,
    updateimage
} = require("../controllers/user")
const upload = require("../Middlewares/upload")


router.put("/user/:id", updateStatusSeller)
router.post("/user/:id", deleteUser)
router.get("/userSeller", listUserSeller)
router.get("/userBuyer", listUserBuyer)
router.get("/profile/:id", getUserProfile)
router.patch("/profile/:id",updateUser)

router.post("/image/:id",upload.single("image"),updateimage)
module.exports = router