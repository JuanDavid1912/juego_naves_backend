const express = require('express');
const router = express.Router();
const levelController = require('../controllers/level_controller');

router.post('/register', levelController.registerLevel);
router.get('/list', levelController.listLevels);
router.put('/update/:id', levelController.updateLevel);
router.delete('/delete/:id', levelController.deleteLevel);

module.exports = router;