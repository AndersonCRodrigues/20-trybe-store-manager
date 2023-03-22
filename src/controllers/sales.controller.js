const salesService = require('../services/sales.service');

const create = async (req, res, next) => {
  try {
    const sales = req.body;

    const data = await salesService.create(sales);

    if (data.status) {
      return res.status(data.status).json({ message: data.message });
    }

    return res.status(201).json(data);
  } catch (e) {
    next(e);
  }
};

module.exports = { create };