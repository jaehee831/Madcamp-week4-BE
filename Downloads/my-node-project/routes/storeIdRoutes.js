//storeId 관련 API 엔드포인트를 정의
const express = require('express');
const router = express.Router();
const storeIdController = require('../controllers/storeIdController');

router.post('/get_store_id', storeIdController.handlePassword);

module.exports = router;
