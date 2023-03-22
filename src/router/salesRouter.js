const { Router } = require('express');
const salesController = require('../controllers/sales.controller');
const { salesValidation } = require('../middlewares/salesValidation');

const router = Router();

router.post('/', salesValidation, salesController.create)
  .get('/', salesController.findAll)
  .get('/:id', salesController.findById)
  .delete('/:id', salesController.salesDelete)
  .put('/:id', salesValidation, salesController.update);

module.exports = router;