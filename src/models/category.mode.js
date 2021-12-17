const { model, Schema } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Category", categorySchema);
