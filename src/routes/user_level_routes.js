const express = require('express');
const router = express.Router();
const userLevelController = require('../controllers/user_level_controller');
const authentication = require('../middlewares/authentication');

router.post('/register',authentication, userLevelController.registerUserLevel);
router.get('/list',authentication, userLevelController.listUsersLevels);
router.put('/update/:id',authentication, userLevelController.updateUserLevel);
router.delete('/delete/:id',authentication, userLevelController.deleteUserLevel);

module.exports = router;