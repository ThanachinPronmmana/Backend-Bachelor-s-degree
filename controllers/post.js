const prisma = require("../config/prisma");
const { connect } = require("../routers/user");
exports.createpost = async (req, res) => {
    try {
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
            Link_line,
            Link_facbook,
            Name,
            Phone,
            Bathroom,
            Propertytype,
            Other_related_expenses
        } = req.body
        const { userId } = req.params
        const files = req.files;
        const newPost = await prisma.propertyPost.create({
            data: {
                Property_Name,
                Province,
                District,
                Subdistrict,
                Address,
                Propertytype,
                Usable_Area: parseFloat(Usable_Area),
                Total_Rooms: parseInt(Total_Rooms),
                Year_Built,
                Nearby_Landmarks,
                Land_Size:parseFloat(Land_Size),
                Bedrooms: parseInt(Bedrooms),
                Bathroom: parseInt(Bathroom),
                Description,
                Deposit_Amount: parseFloat(Deposit_Amount),
                Contract_Seller,
                LinkMap,
                Price: parseFloat(Price),
                Additional_Amenities,
                Parking_Space: parseInt(Parking_Space),
                Sell_Rent: Sell_Rent,
                Link_line,
                Link_facbook,
                Name,
                Phone,
                Latitude: parseFloat(Latitude),
                Longitude: parseFloat(Longitude),
                Other_related_expenses,
                user: {
                    connect: {
                        id: userId
                    }
                },
                Image: {
                    create: files.map((file) => ({
                        asset_id: file.asset_id,
                        public_id: file.public_id,
                        url: file.path || file.url,
                        secure_url: file.secure_url || file.path
                    }))
                }
            }, include: {
                Image: true,
            }
        })
        res.status(201).json(newPost)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Server Error"
        })
    }
}
exports.list = async(req,res)=>{
    try {
        
    }catch(err){

    }
}
exports.listbycategory = async(req,res)=>{

}
exports.listbyPrice = async(req,res)=>{

}
exports.listbyQuery = async(req,res)=>{
    
}
exports.searchFilters = async(req,res)=>{

}
exports.removepost = async(req,res)=>{

}
