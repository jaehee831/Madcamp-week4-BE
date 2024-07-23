const express = require('express');
const router = express.Router();
const userTaskController = require('../controllers/userTaskController');

router.post('/add_user_task', userTaskController.addUserTask);
router.post('/get_user_from_task', userTaskController.getUserFromTask);

module.exports = router;