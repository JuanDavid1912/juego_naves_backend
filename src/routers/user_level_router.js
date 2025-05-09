const express = require('express');
const router = express.Router();
const userLevelController = require('../controllers/user_level_controller');

router.post('/register', userLevelController.registerUserLevel);
router.get('/list', userLevelController.listUsersLevels);
router.put('/update/:id', userLevelController.updateUserLevel);
router.delete('/delete/:id', userLevelController.deleteUserLevel);

module.exports = router;