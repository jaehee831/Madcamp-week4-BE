const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController');

router.get('/notice', noticeController.getNotice);
router.put('/notice', noticeController.updateNotice);

module.exports = router;