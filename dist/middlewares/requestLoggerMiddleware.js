"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestLogger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};
module.exports = requestLogger;
//# sourceMappingURL=requestLoggerMiddleware.js.map