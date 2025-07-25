const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  address: {
    type: String,
    required:true,
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return; // ✅ only hash if password is new or modified
  this.password = await bcrypt.hash(this.password, 12);
});


module.exports = mongoose.model("User", userSchema);