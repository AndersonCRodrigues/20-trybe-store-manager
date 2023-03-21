const salesModel = require('../models/sales.model');
const checkArray = require('../utils/checkIfIsArray');
const productService = require('./product.service');

const create = async (array) => {
  console.log('oi');
  const checkedArray = checkArray(array);

  checkedArray.forEach(async (e) => {
    await productService.findById(e.productId);
  });

  const id = await salesModel.createSale(checkedArray);

  const data = { id };

  data.itemsSold = checkedArray.map((e) => ({ productId: e.productId, quantity: e.productId }));

  return data;
};

module.exports = { create };