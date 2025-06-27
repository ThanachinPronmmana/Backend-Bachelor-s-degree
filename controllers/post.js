exports.createpost = async(req,res)=>{
    try{
        const {Property_Name,Price} = req.body
    }catch{
        console.log(err)
        res.status(500).json({
            message:"Server Error"
        })
    }
}