const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 3000;
const url = process.env.MONGO_URL;
const app = express();

const authRoute = require("./Routes/AuthRoute"); // ✅ Note: relative path

app.use(cookieParser()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://intel-hackathon-steel.vercel.app"
  ],
  credentials: true
}));


app.use("/api", authRoute); // ✅ All routes are prefixed with /api

function db() {
  try {
    mongoose.connect(url);
    console.log("✅ DB connected");
  } catch (e) {
    console.log(`❌ DB connection error: ${e}`);
  }
}

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  db();
});
