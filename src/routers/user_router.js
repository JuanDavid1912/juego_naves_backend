const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

router.post('/register', userController.registerUser);
router.get('/list', userController.listUsers);
router.put('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;