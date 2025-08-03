const express = require("express")
const router = express.Router()
const { 
    updateStatusSeller,
    deleteUser,
    listUserSeller,
    listUserBuyer,
    getUserProfile,
    updateUser,
    updateimage,
    getSellerProfile,
    updateSeller
} = require("../controllers/user")
const upload = require("../Middlewares/upload")

//Seller
router.put("/user/:id", updateStatusSeller)
router.post("/user/:id", deleteUser)
router.get("/userSeller", listUserSeller)
router.get("/profileseller/:id",getSellerProfile)
router.patch("/profileseller/:id",updateSeller)
//Buyer
router.get("/userBuyer", listUserBuyer)
router.get("/profile/:id", getUserProfile)
router.patch("/profile/:id",updateUser)


//profile image
router.post("/image/:id",upload.single("image"),updateimage)
module.exports = router