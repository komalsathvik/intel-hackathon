const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "items.productType", // dynamic reference
  },
  productType: {
    type: String,
    required: true,
    enum: ["Processor", "Accelerator", "System"],
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
});

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [CartItemSchema],
    totalPriceInr: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true } // auto includes createdAt and updatedAt
);

module.exports = mongoose.model("Cart", CartSchema);
