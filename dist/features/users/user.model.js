"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { number } = require("joi");
const { default: mongoose, Schema } = require("mongoose");
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        require: true,
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
}, { timestamps: true });
module.exports = mongoose.model("user", userSchema);
//# sourceMappingURL=user.model.js.map