const { Router } = require('express');
const product = require('../controllers/products.controller');

const router = Router();

router.get('/', product.findAll)
  .get('/:id', product.findById)
  .post('/', product.create);

module.exports = router;