const prisma = require("../config/prisma")
exports.createpost = async(req,res)=>{
    try{
        const {
            Property_Name,
            Price,
            Usable_Area,
            Land_Size,
            Bedrooms,
            Description,
            Deposit_Amount,
            Contract_Seller,
            LinkMap,
            Latitude,
            Longitude,
            Province,
            District,
            Subdistrict,
            Address,
            Total_Rooms,
            Year_Built,
            Nearby_Landmarks,
            Additional_Amenities,
            Parking_Space,
            Sell_Rent,
        } = req.body

        const newPost = await prisma.propertyPost.create({
            data: {
                Property_Name,
                Province,
                District,
                Subdistrict,
                Address,
                Propertytype,
                Usable_Area,
                Total_Rooms,
                Year_Built,
                Nearby_Landmarks,
                Image:{
                    create:image.map((img)=>({
                        asset_id:img.asset_id,
                        public_id:img.public_id,
                        url:img.url,
                        secure_url:img.secure_url
                    }))
                }
            }
        })
        res.send(newPost)

    }catch{
        console.log(err)
        res.status(500).json({
            message:"Server Error"
        })
    }
}