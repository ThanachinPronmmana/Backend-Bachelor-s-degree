const prisma = require("../config/prisma");
const { Status_Seller, UserType } = require("@prisma/client");

exports.updateStatusSeller = async (req, res) => {
  try {
    const { Status } = req.body;
    const { id } = req.params;
    const normalizedStatus = Status?.toUpperCase();
    if (!Object.values(Status_Seller).includes(normalizedStatus)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }
    const existingSeller = await prisma.seller.findUnique({
      where: { id },
    });

    if (!existingSeller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    const seller = await prisma.seller.update({
      where: { id },
      data: { Status },
    });

    res.json(seller);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    await prisma.user.delete({
      where: { id }
    })
    res.json({
      user
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Server Error",
    })
  }
}
exports.listUserSeller = async(req,res)=>{
  try{
    
    const listusers = await prisma.user.findMany({
      where:{
        userType:"Seller"
      },
      select:{
        id:true,
        Email:true,
        First_name:true,
        Last_name:true,
        userType:true,
        Seller:true,
        Payment:true,
        Contract:true
      }
    })
    
    res.json(listusers)
  }catch(err){
    console.log(err)
    res.status(500).json({
      message:"Server Error"
    })
  }
}
exports.listUserBuyer = async(req,res)=>{
  try{
    
    const listusers = await prisma.user.findMany({
      where:{
        userType:"Buyer"
      },
      select:{
        id:true,
        Email:true,
        First_name:true,
        Last_name:true,
        userType:true,
        Seller:true,
        Payment:true,
        Contract:true
      }
    })
    
    res.json(listusers)
  }catch(err){
    console.log(err)
    res.status(500).json({
      message:"Server Error"
    })
  }
}








































/*
GET /api/user → ดูผู้ใช้ทั้งหมด

GET /api/user/:id → ดูผู้ใช้ตาม ID

PUT /api/user/:id → แก้ไขข้อมูลผู้ใช้ทั่วไป (First_name, Last_name, Phone ฯลฯ)

DELETE /api/user/:id → ลบผู้ใช้ (พร้อมลบ Buyer/Seller ที่เกี่ยวข้อง)

*/

