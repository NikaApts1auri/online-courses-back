"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app = require("./app");
const connectToDB = require("./config/db.config");
let isDBConnected = false;
connectToDB()
    .then(() => {
    console.log("Database connected");
    isDBConnected = true;
})
    .catch((err) => {
    console.error("Database connection failed:", err);
});
module.exports = (req, res) => {
    if (!isDBConnected) {
        res.status(503).json({ message: "Database not connected yet" });
        return;
    }
    app(req, res);
};
//# sourceMappingURL=server.js.map