const productService = require('../services/product.service');

const findAll = async (_req, res) => {
  const data = await productService.findAll();
  res.status(200).json(data);
};

const findById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [data] = await productService.findById(id);
   /*  if (data.status) {
      return res.status(data.status).json({ message: data.message });
    } */
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
};

const create = async (req, res) => {
  const { name } = req.body;
  const data = await productService.create(name);
  res.status(201).json(data);
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const data = await productService.update(id, name);
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
};

module.exports = { findAll, findById, create, update };