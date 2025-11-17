"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
module.exports = (schema, data) => {
    const { error, value } = schema.validate(data, { abortEarly: false });
    if (error) {
        return { valid: false, errors: error.details.map((e) => e.message) };
    }
    return { valid: true, value };
};
//# sourceMappingURL=validate.js.map