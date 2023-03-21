const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(5).required().label('name'),
}).messages({
  'any.required': '{{#labe}} is required',
  'any.min': '{{#labe}} length must be at least 5 characters long',
});

module.exports = productSchema;