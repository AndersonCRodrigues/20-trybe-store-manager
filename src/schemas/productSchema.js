const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(5).required().label('name'),
}).messages({
  'any.required': '{{#label}} is required',
  'any.min': '{{#label}} length must be at least 5 characters long',
});

module.exports = productSchema;