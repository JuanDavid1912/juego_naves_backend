const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const authentication = require('../middlewares/authentication');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/list', authentication, userController.listUsers);
router.put('/update/:id', authentication, userController.updateUser);
router.delete('/delete/:id', authentication, userController.deleteUser);

module.exports = router;