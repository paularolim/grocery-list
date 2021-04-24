const router = require('express').Router();

const userController = require('../controllers/userController');
const listController = require('../controllers/listController');

router.post('/login', userController.login);

router.get('/users', userController.getAll);
router.post('/users', userController.create);

router.get('/users/:userId/lists', listController.getAll);
router.post('/users/:userId/lists', listController.create);
router.delete('/users/:userId/lists/:listId', listController.destroy);
router.put('/users/:userId/lists/:listId', listController.update);

module.exports = router;
