const jwt = require('jsonwebtoken');

// middleware ตรวจสอบ token และสิทธิ์ role
exports.authCheck = (allowedRoles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.SECRETKEY);

      req.user = decoded;

      if (allowedRoles.length && !allowedRoles.includes(decoded.userType)) {
        return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
      }

      next();
    } catch (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
    }
  };
};
