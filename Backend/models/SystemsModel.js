const mongoose = require("mongoose");

const systemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    name: { type: String, required: true },
    processor: { type: String, default: "" }, // Fixed typo
    graphics: { type: String, default: "" },
    display: { type: String, default: "" },
    priceInr: { type: String, required: true }, // Use Number if doing price math
    imgUrl: { type: String, required: true },
    weight: { type: String, default: "" },
    design: { type: String, default: "" },
    memory: { type: String, default: "" },
    storage: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("System", systemSchema);
