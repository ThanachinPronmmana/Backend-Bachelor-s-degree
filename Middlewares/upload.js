const multer = require("multer")
const storage = multer.diskStorage({})
const {CloudinaryStorage } = require("")
const fileFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith("image/")) cb(null,true)
    else cb(new Error("Only image file are allowed",false))
}
const upload = multer({storage,fileFilter})

module.exports = upload