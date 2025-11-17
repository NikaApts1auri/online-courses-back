"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
exports.signUpSchema = Joi.object({
    userName: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)
        .max(20)
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    acceptTerms: Joi.boolean().valid(true).required().messages({
        "any.required": "You must accept Terms of Use and Privacy Policy",
        "any.only": "You must accept Terms of Use and Privacy Policy",
    }),
});
//# sourceMappingURL=sign-up.validation.js.map