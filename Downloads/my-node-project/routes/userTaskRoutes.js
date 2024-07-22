const express = require('express');
const router = express.Router();
const userTaskController = require('../controllers/userTaskController');

router.post('/add_user_task', userTaskController.addUserTask);

module.exports = router;