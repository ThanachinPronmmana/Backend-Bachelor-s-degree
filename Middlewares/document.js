const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const documentStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        const ext = file.mimetype.split("/")[1].toLowerCase();
        const resourceType = ["pdf", "doc", "docx"].includes(ext) ? "raw" : "image";

        return {
            folder: "document",
            allowed_formats: ["jpg", "jpeg", "png", "pdf", "doc", "docx"],
            resource_type: resourceType,
            public_id: `${file.originalname.split(".")[0]}.${ext}`, 
        };
    },
});

const uploadDocument = multer({ storage: documentStorage });

module.exports = uploadDocument;
