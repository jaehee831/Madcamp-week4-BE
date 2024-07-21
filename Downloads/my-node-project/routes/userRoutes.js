const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/save_user', userController.saveUser);

module.exports = router;
