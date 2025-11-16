import Joi = require("joi");

module.exports = (schema: Joi.ObjectSchema, data: any) => {
  const { error, value } = schema.validate(data, { abortEarly: false });
  if (error) {
    return { valid: false, errors: error.details.map((e) => e.message) };
  }
  return { valid: true, value };
};
