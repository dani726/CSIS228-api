// routes/userRoutes.js
const express = require('express');
const productController = require('../controllers/productController');
const { validateUserId, validateUser } = require('../middlewares/validators'); // Import any required validators

const router = express.Router();

// Define routes
router.get('/', (req, res) => userController.getAllProducts(req, res));
router.get('/:id', validateUserId, (req, res) => userController.getProductById(req, res));
router.post('/', validateUser, (req, res) => userController.createProduct(req, res));
router.put('/:id', [validateUserId, validateUser], (req, res) => userController.updateProduct(req, res));
router.delete('/:id', validateUserId, (req, res) => userController.deleteProduct(req, res));

module.exports = router;
