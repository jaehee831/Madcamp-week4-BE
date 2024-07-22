const express = require('express');
const router = express.Router();
const storePWListController = require('../controllers/storePWListController');

router.get('/get_store_pw_list', storePWListController.getStorePWList);

module.exports = router;
