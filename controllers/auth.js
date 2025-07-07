const prisma = require("../config/prisma")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Parking_Needs: ParkingNeedsEnum, Nearby_Facilities: NearbyFacilitiesEnum, Lifestyle_Preferences: LifestylePreferencesEnum } = require("@prisma/client")
const { sendResetEmail, verifyemail } = require("../utils/email")
exports.preRegister = async (req, res) => {
  try {
    const {
      Email,
      Password,
      Phone,
      First_name,
      Last_name,
      userType,
    } = req.body;

    if (!Email) return res.status(400).json({ message: "Email is required!!" });
    if (!Password) return res.status(400).json({ message: "Password is required!!" });

    const existingUser = await prisma.user.findFirst({
      where: {
        Email: Email
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);
    const token = jwt.sign({
      Email: Email, Password: hashedPassword, Phone, First_name, Last_name, userType
    }, process.env.SECRETKEY, { expiresIn: "10m" })
    
    const link = `http://localhost:5173/verifyemail?token=${token}`
    console.log("+" + token + "+")
    verifyemail(Email, link)
    // Register Buyer


    res.json({ message: "Verification email sent" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.verifyandregister = async (req, res) => {
  try {
    const {
      token,
      DateofBirth,
      Occaaption,
      Monthly_Income,
      Family_Size,
      Preferred_Province,
      Preferred_District,
      National_ID,
      Company_Name,
      RealEstate_License,
      Status,
      Parking_Needs,
      Nearby_Facilities,
      Lifestyle_Preferences,
      Special_Requirements
    } = req.body
    const decoded = jwt.verify(token, process.env.SECRETKEY)
    const {
      Email,
      Password,
      Phone,
      First_name,
      Last_name,
      userType,
    } = decoded

    if (userType === "Buyer") {

      if (!Object.values(ParkingNeedsEnum).includes(Parking_Needs)) {
        return res.status(400).json({ message: "Invalid Parking_Needs value" });
      }

      if (!Object.values(NearbyFacilitiesEnum).includes(Nearby_Facilities)) {
        return res.status(400).json({ message: "Invalid Nearby_Facilities value" });
      }

      if (!Object.values(LifestylePreferencesEnum).includes(Lifestyle_Preferences)) {
        return res.status(400).json({ message: "Invalid Lifestyle_Preferences value" });
      }
      await prisma.user.create({
        data: {
          Email: Email,
          Password: Password,
          Phone: Phone,
          First_name: First_name,
          Last_name: Last_name,
          userType: "Buyer",
          Buyer: {
            create: {
              DateofBirth: DateofBirth ? new Date(DateofBirth) : null,
              Occaaption: Occaaption,
              Monthly_Income: Monthly_Income ? Number(Monthly_Income) : null,
              Family_Size: Family_Size ? Number(Family_Size) : null,
              Preferred_Province: Preferred_Province,
              Preferred_District: Preferred_District,
              Parking_Needs: Parking_Needs,
              Nearby_Facilities: Nearby_Facilities,
              Lifestyle_Preferences: Lifestyle_Preferences,
              Special_Requirements: Special_Requirements
            }
          }
        }
      });

      return res.json({ message: "Register Buyer success" });
    }

    // Register Seller
    if (userType === "Seller") {
      await prisma.user.create({
        data: {
          Email: Email,
          Password: Password,
          Phone: Phone,
          First_name: First_name,
          Last_name: Last_name,
          userType: "Seller",
          Seller: {
            create: {
              National_ID: National_ID,
              Company_Name: Company_Name,
              RealEstate_License: RealEstate_License,
              Status: Status,
              StartTime: new Date(),
            }
          }
        }
      });

      return res.send("Register sucess")
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Server Error"
    })
  }
}
exports.login = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        Email: Email
      },
      include: {
        Seller: true,
        Buyer: true
      }
    })
    if (!user) {
      return res.status(400).json({
        message: "Password invalid"
      })
    }
    const is_Match = await bcrypt.compare(Password, user.Password)
    if (!is_Match) {
      return res.status(400).json({
        message: "Password invalid"
      })
    }
    let payload

    if (user.userType === "Seller" && user.Seller) {
      payload = {
        id: user.id,
        Email: user.Email,
        userType: user.userType,
        Phone: user.Phone,
        First_name: user.First_name,
        Last_name: user.Last_name,
        Seller: {
          id: user.Seller.id,
          National_ID: user.Seller.National_ID,
          Company_Name: user.Seller.Company_Name,
          RealEstate_License: user.Seller.RealEstate_License,
          Status: user.Seller.Status,
          StartTime: user.Seller.StartTime,
        }
      }
    } else if (user.userType === "Buyer" && user.Buyer) {
      payload = {
        id: user.id,
        Email: user.Email,
        userType: user.userType,
        Phone: user.Phone,
        First_name: user.First_name,
        Last_name: user.Last_name,
        Buyer: {
          id: user.Buyer.id,
          Age: user.Buyer.Age,
          Occaaption: user.Buyer.Occaaption,
          Monthly_Income: user.Buyer.Monthly_Income,
          Family_Size: user.Buyer.Family_Size,
          Preferred_Province: user.Buyer.Preferred_Province,
          Preferred_District: user.Buyer.Preferred_District,
        }
      }
    }
    console.log(payload)
    jwt.sign(payload, process.env.SECRETKEY, {
      expiresIn: "7d"
    }, (err, token) => {
      if (err) {
        return res.status(500).json({
          message: "Server Error"
        })
      }
      res.json({
        message: "Login Sucess"
      })
    })

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error"
    })
  }
}

exports.forgotPassword = async (req, res) => {
  try {
    const { Email } = req.body;
    const user = await prisma.user.findFirst({ where: { Email: Email } });
    if (!Email) {
      return res.status(400).json({
        message: "Email is required"
      })
    }

    if (!user) return res.status(404).json({ message: 'User not found' });

    const token = jwt.sign({
      userId: user.id, email: user.Email
    }, process.env.SECRETKEY, { expiresIn: "10m" })
    console.log("+" + token + "+")
    await prisma.passwordResetToken.create({
      data: {
        token: token,
        userId: user.id,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000) // หมดอายุใน 10 นาที
      }
    });


    const resetLink = `http://localhost:8200/resetpassword${token}`;
    await sendResetEmail(Email, resetLink);

    res.json({ mssage: 'Reset link sent to email' });

  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Server Error"
    })
  }
}


// ตั้งรหัสผ่านใหม่
exports.resetPassword = async (req, res) => {
  const { token, Password } = req.body;

  const tokenEntry = await prisma.passwordResetToken.findFirst({ where: { token } });

  if (!tokenEntry) {
    return res.status(400).json({ message: 'Token invalid' });
  }
  if (tokenEntry.expiresAt < new Date()) {
    return res.status(400).json({ message: 'Token expired' });
  }

  const hashed = await bcrypt.hash(Password, 10);

  await prisma.user.update({
    where: { id: tokenEntry.userId },
    data: { Password: hashed }
  });

  await prisma.passwordResetToken.delete({ where: { token } });

  res.json({ message: 'Password updated' });
};