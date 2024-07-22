const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

router.post('/save_store', storeController.saveStore);

module.exports = router;
