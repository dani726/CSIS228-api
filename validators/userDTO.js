// validators/userValidator.js
const { body, param, validationResult } = require('express-validator');

const validateProduct = [
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name is required'),
  body('descrption')
    .isString()
    .withMessage('description must be valid')
    .notEmpty()
    .withMessage('description is required'),
  body('price')
    .isInt()
    .withMessage('price must be an int')
    .notEmpty()
    .withMessage('price must be intered for product'),
  body('quantity')
    .isInt()
    .withMessage('quantity must be an int')
    .notEmpty()
    .withMessage('quantity must be intered for product'),
  body('category_id')
    .isInt()
    .withMessage('categoryid must be an int')
    .notEmpty()
    .withMessage('category id must be intered for product'),
  body('category_name')
   .isInt()
    .withMessage('category name must be an int')
    .notEmpty()
    .withMessage('category name be intered for product'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateProductId = [
  param('id').isInt().withMessage('ID must be an integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateProduct,
  validateProductId
};
