const prisma = require("../config/prisma")
exports.create = async (req, res) => {
    try {
        const {name} = req.body
        const category = await prisma.category.create({
            data:{
                name:name,
            }
        })
        res.send(category)
        
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message:"Server Error"
        })
    }
}