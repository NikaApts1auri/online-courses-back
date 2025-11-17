"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body || {}, {
            abortEarly: false,
        });
        if (error) {
            return res.status(400).json({
                message: error.details.map((el) => el.message),
            });
        }
        req.body = value;
        next();
    };
};
//# sourceMappingURL=validate.middleware.js.map