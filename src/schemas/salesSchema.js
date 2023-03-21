const Joi = require('joi');

const salesSchema = Joi.object({
  productId: Joi.number().min(1).required().label('productId'),
  quantity: Joi.number().min(1).required().label('productId'),
}).messages({
  'any.required': '{{#label}} is required',
  'any.min': '{{#label}} must be greater than or equal to 1',
});

module.exports = salesSchema;