const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.get('/get_member_work_time', attendanceController.getMemberWorkTime);

module.exports = router;
