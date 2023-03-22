const productModel = require('../models/product.model');

const productError = {
  notFound: { status: 404, message: 'Product not found' },
  notChange: { status: 400, message: 'Row not changed' },
};

const findAll = async () => {
  const [data] = await productModel.findAll();
  return data;
};

const findById = async (id) => {
  const [data] = await productModel.findById(id);
  if (data.length < 1) {
    throw productError.notFound;
    // return [productError.notFound];
  }
  return data;
};

const create = async (name) => {
  const [data] = await productModel.create(name);
  const obj = {
    id: data.insertId,
    name,
  };
  return obj;
};

const update = async (id, name) => {
  const [check] = await productModel.findById(id);
  if (check.length < 1) {
    throw productError.notFound;
  }
  const data = await productModel.update(id, name);
  if (data.affectedRows !== 1) {
    throw productError.notChange;
  }
  return { id, name };
};
module.exports = { findAll, findById, create, update };