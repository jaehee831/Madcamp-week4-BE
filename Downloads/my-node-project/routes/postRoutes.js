const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/api/get_posts', postController.getPostsByBoard);
router.post('/api/create_posts', postController.createPost);

module.exports = router;
