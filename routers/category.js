const express = require("express")
const router = express.Router()
const {
    create,
    removecategory,
    list
} = require("../controllers/category")

router.post("/category",create)
router.delete("/category/:id",removecategory)
router.get("/category",list)

module.exports = router
