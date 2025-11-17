"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports =
    (roles) => (req, res, next) => {
        const role = req.headers["role"];
        if (!roles.includes(role)) {
            return res.status(403).json({ message: "permition denied" });
        }
        next();
    };
//# sourceMappingURL=role.middleware.js.map