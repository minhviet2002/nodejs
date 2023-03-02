const express = require('express');
const router = express.Router();
const productController = require('../../.././controller/user/productController');
const isUserController = require('../../.././config/middleware/isUserController');
router.get('/:categorieSlug/:id', isUserController.isUser,  productController.itemDetail);
router.post('/:categorieSlug/:id', productController.addProductToCart);
router.get('/:categorieSlug', isUserController.isUser,  productController.index);

  module.exports = router;