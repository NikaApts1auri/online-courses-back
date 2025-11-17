"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const { config } = require("./env");
module.exports = async () => {
    try {
        await mongoose.connect(config.mongoUri);
        console.log("MongoDB connected");
    }
    catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
};
//# sourceMappingURL=db.js.map