"use strict";
// const express = require("express");
// const connectToDB = require("./config/db.config");
// const app = require("./app");
Object.defineProperty(exports, "__esModule", { value: true });
const app = require("./app");
const connectToDB = require("./config/db.config");
// Vercel handler
let isDBConnected = false;
connectToDB()
    .then(() => {
    console.log("Database connected");
    isDBConnected = true;
})
    .catch((err) => {
    console.error("Database connection failed:", err);
});
// CommonJS export default function for Vercel
module.exports = (req, res) => {
    if (!isDBConnected) {
        res.status(503).json({ message: "Database not connected yet" });
        return;
    }
    app(req, res);
};
//# sourceMappingURL=server.js.map