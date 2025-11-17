"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const envSchema = Joi.object({
    PORT: Joi.number().default(5000),
    MONGO_URI: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
}).unknown();
const { error, value: env } = envSchema.validate(process.env);
if (error)
    throw new Error(`Config validation error: ${error.message}`);
module.exports = {
    port: env.PORT,
    mongoUri: env.MONGO_URI,
    jwtSecret: env.JWT_SECRET,
};
//# sourceMappingURL=env.js.map