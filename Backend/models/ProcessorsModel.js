const mongoose = require("mongoose");

const processorSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    name: { type: String, required: true }, // e.g., Intel® Core™ Ultra 9 285K
    cores: { type: String, required: true }, // e.g., 24 (8P + 16E)
    baseFrequencyGHz: { type: String, default: "" },
    maxTurboFrequencyGHz: { type: String, required: true },
    cacheMB: { type: String, default: "" },
    tdpW: { type: String, default: "" },
    graphics: { type: String, default: "" },
    launchDate: { type: String, default: "" },
    priceInr: { type: String, required: true },
    imgUrl: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Processor", processorSchema);
