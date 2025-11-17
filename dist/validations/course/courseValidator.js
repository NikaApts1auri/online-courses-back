"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const lessonSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().allow(""),
    duration: Joi.number().min(1).optional(),
});
const curriculumSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow(""),
    order: Joi.number().integer().optional(),
    lessons: Joi.array().items(lessonSchema).optional(),
});
const courseSchema = Joi.object({
    title: Joi.string().required(),
    image: Joi.string().uri().required(),
    description: Joi.string().required(),
    level: Joi.string().required(),
    duration: Joi.number().required(),
    content: Joi.string().required(),
    author: Joi.string().required(),
    curriculums: Joi.array().items(curriculumSchema).optional(),
});
module.exports = {
    courseSchema,
};
//# sourceMappingURL=courseValidator.js.map