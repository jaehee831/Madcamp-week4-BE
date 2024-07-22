const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');

router.get('/api/get_boards', boardController.getBoards);

module.exports = router;
