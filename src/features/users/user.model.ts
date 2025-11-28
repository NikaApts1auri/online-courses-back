const { number } = require("joi");
const { default: mongoose, Schema } = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("user", userSchema);
