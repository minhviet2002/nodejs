const express = require('express');
const router = express.Router();
const loginController = require('../../../controller/auth/loginController');
router.get('/', loginController.index);
router.post('/post', loginController.post);

  module.exports = router;