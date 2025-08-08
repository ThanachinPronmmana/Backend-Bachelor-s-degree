const prisma = require("../config/prisma");
const { Status_Seller, UserType } = require("@prisma/client");
const cloudinary = require("../utils/cloudinary")
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
exports.getSellerProfile = async (req, res) => {
  try {
    const { id } = req.params
    const seller = await prisma.user.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        First_name: true,
        Last_name: true,
        Email: true,
        image: true,
        Phone: true,
        Seller: {
          select: {
            National_ID: true,
            Company_Name: true,
            RealEstate_License: true,
            Status: true
          }
        }
      }

    })
    if (!seller) {
      return res.status(404).json({
        message: "User not found"
      })
    }
    res.json(seller)
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
        image: true,
        Phone: true,
        Buyer: {
          select: {
            DateofBirth: true,
            Occupation: true,
            Monthly_Income: true,
            Family_Size: true,
            Parking_Needs: true,
            Nearby_Facilities: true,
            Lifestyle_Preferences: true,
            Special_Requirements: true,
            Preferred_District: true,
            Preferred_Province: true
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
exports.updateSeller = async (req, res) => {
  try {
    const { id } = req.params
    const {
      First_name,
      Last_name,
      Email,
      Phone,
      National_ID,
      Company_Name,
      RealEstate_License,
      image
    } = req.body

    const dataToupdate = {}
    if (First_name !== undefined) dataToupdate.First_name = First_name
    if (Last_name !== undefined) dataToupdate.Last_name = Last_name
    if (Email !== undefined) dataToupdate.Email = Email
    if (Phone !== undefined) dataToupdate.Phone = Phone
    if (image !== undefined) dataToupdate.image = image

    const sellerDataToupdate = {}

    if (National_ID !== undefined) sellerDataToupdate.National_ID = National_ID
    if (Company_Name !== undefined) sellerDataToupdate.Company_Name = Company_Name
    if (RealEstate_License !== undefined) sellerDataToupdate.RealEstate_License = RealEstate_License

    if (Object.keys(sellerDataToupdate).length > 0) {
      dataToupdate.Seller = {
        update: sellerDataToupdate
      }
    }

    const Updateseller = await prisma.user.update({
      where: {
        id
      },
      data: dataToupdate,
      include: {
        Seller: true
      }
    })
    if (Updateseller.Password) {
      delete Updateseller.Password
    }
    res.json({
      message: "Seller Updated Successfully",
      user: Updateseller
    })
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
      Occupation,
      Monthly_Income,
      Family_Size,
      Parking_Needs,
      Nearby_Facilities,
      Lifestyle_Preferences,
      Special_Requirements,
      image,
      Preferred_Province,
      Preferred_District
    } = req.body;

    // กรองเฉพาะฟิลด์ที่ส่งมา
    const dataToUpdate = {};
    if (First_name !== undefined) dataToUpdate.First_name = First_name;
    if (Last_name !== undefined) dataToUpdate.Last_name = Last_name;
    if (Email !== undefined) dataToUpdate.Email = Email;
    if (Phone !== undefined) dataToUpdate.Phone = Phone;
    if (image !== undefined) dataToUpdate.image = image;

    const buyerDataToUpdate = {};
    if (DateofBirth !== undefined) buyerDataToUpdate.DateofBirth = new Date(DateofBirth);
    if (Occupation !== undefined) buyerDataToUpdate.Occupation = Occupation;
    if (Monthly_Income !== undefined) buyerDataToUpdate.Monthly_Income = Monthly_Income;
    if (Family_Size !== undefined) buyerDataToUpdate.Family_Size = Family_Size;
    if (Parking_Needs !== undefined) buyerDataToUpdate.Parking_Needs = Parking_Needs;
    if (Nearby_Facilities !== undefined) buyerDataToUpdate.Nearby_Facilities = Nearby_Facilities;
    if (Lifestyle_Preferences !== undefined) buyerDataToUpdate.Lifestyle_Preferences = Lifestyle_Preferences;
    if (Special_Requirements !== undefined) buyerDataToUpdate.Special_Requirements = Special_Requirements;
    if (Preferred_Province !== undefined) buyerDataToUpdate.Preferred_Province = Preferred_Province;
    if (Preferred_District !== undefined) buyerDataToUpdate.Preferred_District = Preferred_District;
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

exports.updateimage = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const imageUrl = file.path || file.url;
    const publicId = file.filename || file.public_id;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        image: imageUrl,
        publicId: publicId,
      },
    });

    res.status(200).json({
      message: "Image uploaded and user updated successfully",
      image: {
        url: updatedUser.image,
        publicId: updatedUser.publicId,
      },
    });

  } catch (err) {
    console.error("Upload image error:", err);
    res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};
exports.deposit = async(req,res)=>{
  try{

  }catch(err){

  }
}
exports.getpostBySeller= async(req,res)=>{
  try{
    const {id} = req.params
    const user = await prisma.user.findFirst({
      where: {id}
    })
    if(!user){
      return res.status(404).json({
        message:"User not found"
      })
    }
    const posts = await prisma.propertyPost.findMany({
      where:{
        userId:id
      },
      select:{
        id:true,
        Property_Name:true,
        Price:true,
        Status_post:true,
        Address:true,
        Province:true,
        District:true,
        Image:true,
        Category:true,
        
      }
    })
    res.json({
      message:"Success",
      posts
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

