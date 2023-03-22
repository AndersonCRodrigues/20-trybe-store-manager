const salesModel = require('../models/sales.model');
const checkArray = require('../utils/checkIfIsArray');
const productService = require('./product.service');

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

module.exports = { create };