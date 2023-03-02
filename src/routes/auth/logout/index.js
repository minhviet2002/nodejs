const express = require('express');
const router = express.Router();
const logoutController = require('../../../controller/auth/logoutController');
router.post('/', logoutController.post);

  module.exports = router;