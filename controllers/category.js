const prisma = require("../config/prisma")
exports.create = async (req, res) => {
    try {
        const {name} = req.body
        const category = await prisma.category.create({
            data:{
                name:name.toLowerCase(),
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
exports.list = async(req,res)=>{
    try{
        const category = await prisma.category.findMany()
          res.json(category)
    }catch(err){

    }
}