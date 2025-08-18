const prisma = require("../config/prisma")
exports.getSellerNotifications = async(req,res)=>{
    try{
        const {sellerId} = req.params
        if(!sellerId){
            return res.status(400).json({message: "Seller ID is required."})
        }
        const notification = await prisma.notification.findMany({
            where:{
                userId:sellerId,
                relatedProcess:"DOCUMENT_UPLOAD"
            },

        })
        res.json({
            message:"success",
            data:notification
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"Server Error"
        })
    }
}