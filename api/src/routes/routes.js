const router = require('express').Router();

const userController = require('../controllers/userController');

router.get('/users', userController.getAll);
router.post('/users', userController.create);

module.exports = router;
