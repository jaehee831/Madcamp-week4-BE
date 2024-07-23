// routes/userWageRoutes.js
const express = require('express');
const router = express.Router();
const userWageController = require('../controllers/userWageController');

router.post('/add_users_to_wages', userWageController.addUsersToWages);
router.get('/get_user_wage', userWageController.getUserWages);
router.get('/get_one_user_wage', userWageController.getUserWage);
router.put('/edit_user_wage', userWageController.editUserWage);
module.exports = router;
