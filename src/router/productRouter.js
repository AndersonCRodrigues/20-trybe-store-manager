const { Router } = require('express');
const product = require('../controllers/products.controller');
const productValidation = require('../middlewares/productValidation');

const router = Router();

router
  .get('/', product.findAll)
  .get('/:id', product.findById)
  .post('/', productValidation.nameValidation, product.create)
  .put('/:id', productValidation.nameValidation, product.update);

module.exports = router;