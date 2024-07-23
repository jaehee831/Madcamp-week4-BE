const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.get('/get_member_work_time', attendanceController.getMemberWorkTime);
router.post('/attendance_record', attendanceController.recordAttendance);

module.exports = router;
