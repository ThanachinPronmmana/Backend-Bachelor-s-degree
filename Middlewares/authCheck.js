const jwt = require('jsonwebtoken');

// middleware ตรวจสอบ token และสิทธิ์ role
exports.authCheck = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = {
      id: user.id,
      email: user.email,
      userType: user.userType,
    };

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

