const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports.userVerification = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    console.log("No token found");
    return res.status(401).json({ status: false, message: "No token found" });
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {
    if (err) {
      console.log("JWT verification failed");
      return res.status(401).json({ status: false, message: "Invalid token" });
    }

    try {
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ status: false, message: "User not found" });
      }

      req.user = { id: user._id }; 
      next(); 
    } catch (error) {
      console.error("Middleware DB Error:", error);
      return res.status(500).json({ status: false, message: "Server error" });
    }
  });
};
