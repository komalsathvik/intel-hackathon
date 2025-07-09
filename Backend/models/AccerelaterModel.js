const mongoose = require("mongoose");

const acceleratorSchema = new mongoose.Schema(
  {
    configuration: { type: String, default: "" },
    title: { type: String, required: true },
    name: { type: String, required: true },
    priceINR: { type: Number, required: true },
    perUnitEstimate: { type: String, default: "" },
    availability: { type: String, default: "" },
    performance: { type: String, default: "" },
    formFactor: { type: String, default: "" },
    features: { type: String, default: "" },
    specifications: { type: String, default: "" },
    imgUrl: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Accelerator", acceleratorSchema);
