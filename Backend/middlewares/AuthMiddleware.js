const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports.userVerification = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    if (process.env.NODE_ENV !== "production") {
      console.log("🔐 No token in request cookies");
    }
    return res.status(401).json({ success: false, message: "Authentication required" });
  }

  try {
    if (!process.env.TOKEN_KEY) {
      throw new Error("TOKEN_KEY not defined in environment");
    }

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = { id: user._id }; // Optional: add email or role if needed
    next();
  } catch (err) {
    console.error("🔐 Token verification error:", err.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
