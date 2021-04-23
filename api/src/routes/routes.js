const router = require('express').Router();

const userController = require('../controllers/userController');

router.post('/login', userController.login);

router.get('/users', userController.getAll);
router.post('/users', userController.create);

module.exports = router;
