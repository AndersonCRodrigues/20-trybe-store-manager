const Joi = require('joi');
const salesSchema = require('../schemas/salesSchema');
const checkArray = require('../utils/checkIfIsArray');

const errorCheck = (error) => {
  if (error.details[0].type === 'number.min') {
    const errType = { status: 422, message: error.message };
    throw errType;
  }
  if (error.details[0].type === 'any.required') {
    const errType = { status: 400, message: error.message };
    throw errType;
  }
};

const salesValidation = (req, _res, next) => {
  const sales = req.body;
  const salesArray = checkArray(sales);
  const salesArraySchema = Joi.array().items(salesSchema);
  const { error } = salesArraySchema.validate(salesArray);

  if (error) errorCheck(error);

  next();
};

module.exports = { salesValidation };