const { model, Schema } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      lowercase: true,
    },
    qtyPerUnit: Number,
    unitPrice: Number,
    unitInStock: Number,
    discontinued: {
      type: Boolean,
      default: false,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

module.exports = model("Product", productSchema);
