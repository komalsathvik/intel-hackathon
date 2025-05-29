const User = require("../models/userModel");
const { createSecretToken } = require("../util/secretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res) => {
  try {
    const { email, password, reenteredPassword, username, address } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    if (password !== reenteredPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await User.create({ email, password, username, address });
    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    return res.status(201).json({
      message: "User signed in successfully",
      success: true,
      user,
    });

  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password ){
      return res.json({message:'All fields are required'})
    }
    const user = await User.findOne({ email });
    if(!user){
      return res.json({message:'Incorrect password or email' }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.json({message:'Incorrect password or email' }) 
    }
     const token = createSecretToken(user._id);
     res.cookie("token", token, {
       withCredentials: true,
       httpOnly: false,
     });
     res.status(201).json({ message: "User logged in successfully", success: true });
     next()
  } catch (error) {
    console.error(error);
  }
}
module.exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      return res.json({
        success: true,
        user: { email: user.email, username: user.username, address: user.address },
      });
    } else {
      return res.json({ success: false, message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports.updateProfile = async (req, res) => {
  const { email, username, password, address } = req.body;
  try {
    const user = await User.findById(req.user.id);
    console.log("data recieved");
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Update user fields
    user.email = email || user.email;
    user.username = username || user.username;
    if (password) {
  user.password = password;
}
    user.address = address || user.address;
console.log("After update:", user);
    await user.save();
    console.log("After saved:", user);
    return res.json({ success: true, message: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
