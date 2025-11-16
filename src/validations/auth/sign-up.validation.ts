const Joi = require("joi");

exports.signUpSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(20)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});
