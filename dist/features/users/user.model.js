"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { number, required } = require("joi");
const { default: mongoose, Schema } = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("user", userSchema);
//# sourceMappingURL=user.model.js.map
