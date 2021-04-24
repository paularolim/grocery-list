const router = require('express').Router();

const userController = require('../controllers/userController');
const listController = require('../controllers/listController');
const itemController = require('../controllers/itemController');

router.post('/login', userController.login);

router.get('/users', userController.getAll);
router.post('/users', userController.create);

router.get('/users/:userId/lists', listController.getAll);
router.post('/users/:userId/lists', listController.create);
router.delete('/users/:userId/lists/:listId', listController.destroy);
router.put('/users/:userId/lists/:listId', listController.update);

router.get('/lists/:listId/items', itemController.getAll);
router.post('/lists/:listId/items', itemController.create);
router.put('/lists/:listId/items/:itemId/check', itemController.mark);
router.put('/lists/:listId/items/:itemId', itemController.update);
router.delete('/lists/:listId/items/:itemId', itemController.destroy);

module.exports = router;
