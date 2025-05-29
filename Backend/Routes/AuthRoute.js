const {Signup,Login,getProfile,updateProfile}=require("../controllers/AuthController");
const {userVerification}=require("../middlewares/AuthMiddleware");
const axios = require("axios");
const router = require("express").Router();
const Processor = require("../models/ProcessorsModel");
const System = require("../models/SystemsModel");
const Accelerater = require("../models/AccerelaterModel")
const Cart = require("../models/CartModel");

router.post("/signup", Signup);
router.post('/login',Login);
router.post('/',userVerification);
router.get('/profile', userVerification, getProfile);
router.put('/profile/update', userVerification, updateProfile);

router.get("/proccessors", async (req, res) => {
  try {
    const processors = await Processor.find({});
    res.json(processors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/Systems", async (req, res) => {
  try {
    const systems = await System.find({});
    res.json(systems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/Acceleraters", async (req, res) => {
  try {
    const accelerators = await Accelerater.find({});
    res.json(accelerators);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const { GoogleGenAI } = require("@google/genai"); // use require if your backend is CommonJS
// or use import if you have ES modules enabled

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post("/Intellect", async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // use the model name you want
      contents: message,
    });

    // response.text contains the AI reply
    const reply = response.text || "No response";

    res.json({ reply });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to connect to Gemini API." });
  }
});
router.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});



module.exports = router;
