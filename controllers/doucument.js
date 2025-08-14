const prisma = require("@prisma/client")

exports.approveDocument = async(req,res)=>{
    try{
        const {documentId} = req.params
        const {status} = req.body

        const user = await prisma.user.findUnique({
            
        })
    }catch(err){
        
    }
}
exports.getDocument = async(req,res)=>{
    try{
        const {postId} = req.query
        if(req.user.userType === "Buyer"){
            
        }
    }catch(err){

    }
}