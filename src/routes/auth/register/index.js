const express = require('express');
const router = express.Router();
const registerController = require('../../../controller/auth/registerController');
router.get('/', registerController.index);
router.post('/', registerController.post);

  module.exports = router;