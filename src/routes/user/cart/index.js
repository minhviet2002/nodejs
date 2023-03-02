const express = require('express');
const router = express.Router();
const cartController = require('../../.././controller/user/cartController');
const isUserController = require('../../.././config/middleware/isUserController');
// router.get('/:categorieSlug/:id', isUserController.isUser,  productController.itemDetail);
router.get('/', isUserController.isUser,  cartController.index);

  module.exports = router;