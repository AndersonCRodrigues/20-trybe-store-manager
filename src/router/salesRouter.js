const { Router } = require('express');
const salesController = require('../controllers/sales.controller');
const { salesValidation } = require('../middlewares/salesValidation');

const router = Router();

router.post('/', salesValidation, salesController.create)
  .get('/', salesController.findAll);

module.exports = router;