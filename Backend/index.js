const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 3000;
const url = process.env.MONGO_URL;
const app = express();

const authRoute = require("./Routes/AuthRoute");

// Parse cookies and body
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS: allow frontend access
const allowedOrigins = [
  "http://localhost:5173",
  "https://intel-hackathon.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
  })
);

// ✅ Health Check Route (optional)
app.get("/", (req, res) => {
  res.send("🎉 Intel backend is running");
});

// ✅ API Routes
app.use("/api", authRoute);

// ✅ Connect to MongoDB and Start Server
async function db() {
  try {
    await mongoose.connect(url);
    console.log("✅ MongoDB connected");
  } catch (e) {
    console.log(`❌ MongoDB connection error: ${e.message}`);
  }
}

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  db();
});
