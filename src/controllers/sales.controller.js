const salesService = require('../services/sales.service');

const create = async (req, res, next) => {
  try {
    const sales = req.body;

    const data = await salesService.create(sales);

    return res.status(201).json(data);
  } catch (e) {
    next(e);
  }
};

const findAll = async (_req, res) => {
  const data = await salesService.findAll();
  res.status(200).json(data);
};

const findById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await salesService.findById(id);
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
};

const salesDelete = async (req, res, next) => {
  try {
    const { id } = req.params;
    await salesService.salesDelete(id);
    res.status(204).json();
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sales = req.body;
    const data = await salesService.update(id, sales);
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
};

module.exports = { create, findAll, findById, salesDelete, update };