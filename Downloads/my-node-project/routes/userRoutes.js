const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/save_user', userController.saveUser);
router.post('/get_user_name', userController.getUserName);
router.post('/get_store_members', userController.getStoreMembers);
router.post('/check_isadmin', userController.checkIsAdmin);

module.exports = router;
