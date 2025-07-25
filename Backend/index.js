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

// Allow only your frontend origin for CORS
const allowedOrigins = ["http://localhost:5173/","https://intel-hackathon.onrender.com"];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Prefix all API routes with /api
app.use("/api", authRoute);

async function db() {
  try {
    await mongoose.connect(url);
    console.log("✅ DB connected");
  } catch (e) {
    console.log(`❌ DB connection error: ${e}`);
  }
}

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  db();
});
