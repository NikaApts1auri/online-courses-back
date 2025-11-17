"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (req, res, next) => {
    const role = req.headers["role"];
    if (role !== "ADMIN") {
        return res.status(403).json({ error: true, message: "permitioin denied" });
    }
    next();
};
//# sourceMappingURL=isAdmin.middleware.js.map