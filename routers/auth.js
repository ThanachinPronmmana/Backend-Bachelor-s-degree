const express = require("express")
const router = express.Router()
const {
    preRegister,
    login,
    forgotPassword,
    resetPassword,
    verifyandregister
} = require("../controllers/auth")


router.post("/preRegister", preRegister)
router.post("/verifyandregister", verifyandregister)
router.post("/login", login)

router.post("/forgotpassword", forgotPassword)
router.post("/resetpassword", resetPassword)


module.exports = router