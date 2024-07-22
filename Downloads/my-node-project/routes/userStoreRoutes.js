const express = require('express');
const router = express.Router();
const userStoreController = require('../controllers/userStoreController');

router.post('/save_user_store', userStoreController.saveUserStore);
router.post('/check_user_register_store', userStoreController.checkUserRegisterStore);
router.post('/get_store_list', userStoreController.getStoreList);
router.delete('/delete_store', userStoreController.deleteStore);
router.post('/get_store_name_list', userStoreController.getStoreNameList);


module.exports = router;
