const salesModel = require('../models/sales.model');
const checkArray = require('../utils/checkIfIsArray');
const productService = require('./product.service');

const productError = {
  notFound: { status: 404, message: 'Sale not found' },
};

const create = async (array) => {
  const checkedArray = checkArray(array);
  try {
    const promises = checkedArray.map(async (e) => {
      await productService.findById(e.productId);
    });

    await Promise.all(promises);

    const id = await salesModel.createSale(checkedArray);

    const data = { id };

    data.itemsSold = checkedArray.map((e) => ({ productId: e.productId, quantity: e.quantity }));

    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const findAll = async () => {
  const data = await salesModel.findAll();
  return data;
};

const findById = async (id) => {
  const data = await salesModel.findById(id);

  if (data.length < 1) {
    throw productError.notFound;
  }

  return data;
};

const salesDelete = async (id) => {
  await findById(id);

  await salesModel.salesDelete(id);
};

module.exports = { create, findAll, findById, salesDelete };