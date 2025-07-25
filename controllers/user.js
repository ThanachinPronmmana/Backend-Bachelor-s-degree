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
exports.listUserSeller = async (req, res) => {
  try {

    const listusers = await prisma.user.findMany({
      where: {
        userType: "Seller"
      },
      select: {
        id: true,
        Email: true,
        First_name: true,
        Last_name: true,
        userType: true,
        Seller: true,
        Payment: true,
        Contract: true
      }
    })

    res.json(listusers)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Server Error"
    })
  }
}
exports.listUserBuyer = async (req, res) => {
  try {

    const listusers = await prisma.user.findMany({
      where: {
        userType: "Buyer"
      },
      select: {
        id: true,
        Email: true,
        First_name: true,
        Last_name: true,
        userType: true,
        Seller: true,
        Payment: true,
        Contract: true
      }
    })

    res.json(listusers)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Server Error"
    })
  }
}
exports.getUserProfile = async (req, res) => {
  try {
    const { id } = req.params

    const user = await prisma.user.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        First_name: true,
        Last_name: true,
        Email: true,
        Buyer: {
          select: {
            DateofBirth: true,
            Occaaption: true,
            Monthly_Income: true,
            Family_Size: true,
            Parking_Needs: true,
            Nearby_Facilities: true,
            Lifestyle_Preferences: true,
            Special_Requirements: true,
          }
        }
      }

    })

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }
    res.json(user)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Server Error"
    })
  }
}
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      First_name,
      Last_name,
      Email,
      Phone,
      DateofBirth,
      Occaaption,
      Monthly_Income,
      Family_Size,
      Parking_Needs,
      Nearby_Facilities,
      Lifestyle_Preferences,
      Special_Requirements,
    } = req.body;

    // กรองเฉพาะฟิลด์ที่ส่งมา
    const dataToUpdate = {};
    if (First_name !== undefined) dataToUpdate.First_name = First_name;
    if (Last_name !== undefined) dataToUpdate.Last_name = Last_name;
    if (Email !== undefined) dataToUpdate.Email = Email;
    if (Phone !== undefined) dataToUpdate.Phone = Phone;

    const buyerDataToUpdate = {};
    if (DateofBirth !== undefined) buyerDataToUpdate.DateofBirth = new Date(DateofBirth);
    if (Occaaption !== undefined) buyerDataToUpdate.Occaaption = Occaaption;
    if (Monthly_Income !== undefined) buyerDataToUpdate.Monthly_Income = Monthly_Income;
    if (Family_Size !== undefined) buyerDataToUpdate.Family_Size = Family_Size;
    if (Parking_Needs !== undefined) buyerDataToUpdate.Parking_Needs = Parking_Needs;
    if (Nearby_Facilities !== undefined) buyerDataToUpdate.Nearby_Facilities = Nearby_Facilities;
    if (Lifestyle_Preferences !== undefined) buyerDataToUpdate.Lifestyle_Preferences = Lifestyle_Preferences;
    if (Special_Requirements !== undefined) buyerDataToUpdate.Special_Requirements = Special_Requirements;

    // ถ้ามีข้อมูล Buyer ต้องการอัปเดต
    if (Object.keys(buyerDataToUpdate).length > 0) {
      dataToUpdate.Buyer = {
        update: buyerDataToUpdate
      };
    }

    const Updateuser = await prisma.user.update({
      where: { id },
      data: dataToUpdate,
      include: {
        Buyer: true
      }
    });

    
    if (Updateuser.Password) {
      delete Updateuser.Password;
    }

    res.json({
      message: "User update success",
      user: Updateuser
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

exports.updateimage = async(req,res)=>{
  try{
     const {id} = req.params;
     const file = req.file
     if(!file){
      return res.status(400).json({
        message:"No image uploaded"
      })
     }
     const image = await prisma.image.create({
      data:{
        asset_id:file.asset_id,
        public_id:file.public_id,
        url:file.url,
        secure_url:file.secure_url,
        userId:id
      }
     })
     res.status(201).json({
      message:"Image uploaded successfully",
      image,
     })
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

