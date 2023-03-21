const { Router } = require('express');

const router = Router();

router.get('/', findAll)
      .get('/:id', findById);

module.exports = router;