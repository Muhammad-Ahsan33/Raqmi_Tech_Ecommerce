import jwt from 'jsonwebtoken';
import User from'../models/userModel.js';

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split('Bearer ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(403).json({ message: 'Invalid token' });
  }
};

const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) return res.status(401).json({ message: "Access Denied. No token provided." });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await findById(decoded.id);
        if (!req.user) return res.status(404).json({ message: "User not found" });

        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

// Middleware to verify admin
const isAdmin = async (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access Denied. Admins only." });
    }
    next();
};

export default  { authenticateToken , isLoggedIn, isAdmin };
