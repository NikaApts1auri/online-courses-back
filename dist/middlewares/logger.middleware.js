"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = (req, res, next) => {
    const time = Date.now();
    res.on("finish", () => {
        const finishTime = Date.now() - time;
        console.log(req.method, req.originalUrl, res.statusCode, `${finishTime}ms`);
    });
    next();
};
//# sourceMappingURL=logger.middleware.js.map