const productService = require('../services/product.service');

const findAll = async (_req, res, next) => {
  try {
    const data = await productService.findAll();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const findById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [data] = await productService.findById(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = { findAll, findById };