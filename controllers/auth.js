exports.register = async(req,res)=>{
    try{
        console.log("hello")
        res.send("hello")
    }catch(err){
        res.status(500).json({
            massage:"Server error"
        })
    }
}