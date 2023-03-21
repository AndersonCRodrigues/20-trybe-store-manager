const productSchema = require('../schemas/productSchema');

const nameValidation = (req, _res, next) => {
  const { name } = req.body;

  const { error } = productSchema.validate({ name });
  if (error.details[0].type === 'string.min') {
    const errType = { status: 422, message: error.message };
    throw errType;
  }

  if (error.details[0].type === 'any.required') {
    const errType = { status: 400, message: error.message };
    throw errType;
  }

  next();
};

module.exports = { nameValidation };