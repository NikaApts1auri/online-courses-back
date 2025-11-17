"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requests = {};
const rateLimit = (req, res, next) => {
    const ip = req.ip ?? "unknown";
    const currentCount = requests[ip] ?? 0;
    requests[ip] = currentCount + 1;
    if (requests[ip] > 100) {
        return res.status(429).json({ message: "Too many requests" });
    }
    setTimeout(() => {
        requests[ip] = (requests[ip] ?? 1) - 1;
        if (requests[ip] <= 0)
            delete requests[ip];
    }, 60_000);
    next();
};
module.exports = rateLimit;
//# sourceMappingURL=rateLimitMiddleware.js.map