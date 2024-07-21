//Task 관련 API 엔드포인트를 정의
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/add_task', taskController.addTask);
router.get('/get_user', taskController.getUsers);

module.exports = router;
