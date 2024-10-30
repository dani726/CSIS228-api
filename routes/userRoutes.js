// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const { validateUser, validateUserId } = require('../validators/userDTO');

const router = express.Router();

// Define routes
router.get('/', (req, res) => userController.getAllUsers(req, res));
router.get('/:id', validateUserId, (req, res) => userController.getUserById(req, res));
router.post('/', validateUser, (req, res) => userController.createUser(req, res));
router.put('/:id', [validateUserId, validateUser], (req, res) => userController.updateUser(req, res));
router.delete('/:id', validateUserId, (req, res) => userController.deleteUser(req, res));

module.exports = router;
