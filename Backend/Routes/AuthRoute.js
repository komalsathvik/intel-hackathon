const { Signup, Login, getProfile, updateProfile } = require("../controllers/AuthController");
const { userVerification } = require("../middlewares/AuthMiddleware");

const router = require("express").Router();
const Processor = require("../models/ProcessorsModel");
const System = require("../models/SystemsModel");
const Accelerator = require("../models/AccerelaterModel");
const Cart = require("../models/CartModel");

// Auth routes
router.post("/signup", Signup);
router.post("/login", Login);
router.get("/profile", userVerification, getProfile);
router.put("/profile/update", userVerification, updateProfile);

// Product routes
router.get("/processors", async (req, res) => {
  try {
    const processors = await Processor.find({});
    res.json(processors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/systems", async (req, res) => {
  try {
    const systems = await System.find({});
    res.json(systems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/accelerators", async (req, res) => {
  try {
    const accelerators = await Accelerator.find({});
    res.json(accelerators);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Gemini API integration
const { GoogleGenerativeAI } = require("@google/generative-ai");
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // ✅ use process.env not hardcoded

router.post("/intellect", async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Valid message is required" });
  }

  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(message);
    const response = await result.response;
    const reply = response.text();

    res.json({ reply });
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    res.status(500).json({ error: "Failed to connect to Gemini API." });
  }
});



module.exports = router;
