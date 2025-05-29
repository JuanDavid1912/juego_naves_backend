const express = require('express');
const router = express.Router();
const levelController = require('../controllers/level_controller');
const authentication = require('../middlewares/authentication');

router.post('/register',authentication, levelController.registerLevel);
router.get('/list',authentication, levelController.listLevels);
router.put('/update/:id', authentication,levelController.updateLevel);
router.delete('/delete/:id',authentication, levelController.deleteLevel);

module.exports = router;