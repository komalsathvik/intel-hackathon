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
const allowedOrigins = [
  "http://localhost:3000",
  "https://intel-hackathon-steel.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Preflight support
app.options("*", cors());


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
