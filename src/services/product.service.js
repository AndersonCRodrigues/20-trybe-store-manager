const productModel = require('../models/product.model');

const productError = {
  notFound: { status: 404, message: 'Product not found' },
};

const findAll = async () => {
  const [data] = await productModel.findAll();
  return data;
};

const findById = async (id) => {
  const [data] = await productModel.findById(id);

  if (data.length < 1) {
    throw productError.notFound;
  }

  return data;
};

module.exports = { findAll, findById };