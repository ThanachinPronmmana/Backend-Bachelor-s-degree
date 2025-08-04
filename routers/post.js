const express = require("express")
const router = express.Router()

const upload = require("../Middlewares/upload");

const {
    createpost
}
= require("../controllers/post")

router.post("/propertypost/:userId",upload.array("images",5),createpost)

module.exports = router