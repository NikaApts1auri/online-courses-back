"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { ApiError } = require("../errors/ApiError");
const logger = require("../logger");
/**
 * Centralized error handling middleware
 */
const errorMiddleware = (err, req, res, next) => {
    if (err instanceof ApiError) {
        logger.warn(err.message);
        return res.status(err.statusCode).json({ message: err.message });
    }
    logger.error(err); // გამოიყენე logger, არა console.error
    return res.status(500).json({ message: "Internal Server Error" });
};
module.exports = { errorMiddleware };
//# sourceMappingURL=errorHandlerMiddleware.js.map