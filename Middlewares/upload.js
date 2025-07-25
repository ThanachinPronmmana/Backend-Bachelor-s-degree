const multer = require("multer")
const {CloudinaryStorage } = require("")
const cloudinary = require("../utils/cloudinary")
const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"profile_images",
        allowed_formats:["jpg","jpeg","png"],
        transformation:[{wight:500,height:500,crop:"limit"}]
    },
})
const fileFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith("image/")) cb(null,true)
    else cb(new Error("Only image file are allowed",false))
}
const upload = multer({storage,fileFilter})

module.exports = upload