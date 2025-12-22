const Joi = require('joi');

const registerSchema = Joi.object({
    name: Joi.string()
        .pattern(/^[\p{L}\p{N}_ ]+$/u)
        .min(3)
        .max(50)
        .required(),
    email: Joi.string()
        .email()
        .max(255)
        .required()
});

module.exports = { registerSchema };