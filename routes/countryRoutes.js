const express = require('express');
const countryController = require('../controllers/countryController');

const router = express.Router();

// Define routes
router.get('/', (req, res) => countryController.getAllCountries(req, res));
router.get('/:id', (req, res) => countryController.getCountryById(req, res));
router.post('/', (req, res) => countryController.createCountry(req, res));
router.put('/:id', (req, res) => countryController.updateCountry(req, res));
router.delete('/:id', (req, res) => countryController.deleteCountry(req, res));

module.exports = router;
