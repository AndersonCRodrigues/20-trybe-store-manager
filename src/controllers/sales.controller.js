const salesService = require('../services/sales.service');

const create = async (req, res) => {
  const sales = req.body;

  const data = await salesService.create(sales);

  res.status(201).json(data);
};

module.exports = { create };