
const countryService = require('../services/countryService');

class CountryController {
    
  async getAllCountries(req, res) {
    try {
      const countries = await countryService.getAllCountries();
      res.json(countries);
    } catch (error) {
      console.error('Error fetching countries:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getCountryById(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const country = await countryService.getCountryById(id);
      if (!country) {
        return res.status(404).json({ message: 'Country not found' });
      }
      res.json(country);
    } catch (error) {
      console.error('Error fetching country:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async createCountry(req, res) {
    try {
      const { name, abbr } = req.body;
      if (!name || !abbr) {
        return res.status(400).json({ message: 'Name and abbr are required' });
      }
      const newCountry = await countryService.createCountry({ name, abbr });
      res.status(201).json(newCountry);
    } catch (error) {
      console.error('Error creating country:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateCountry(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const { name, abbr } = req.body;
      if (!name || !abbr) {
        return res.status(400).json({ message: 'Name and abbr are required' });
      }
      const success = await countryService.updateCountry(id, { name, abbr });
      if (!success) {
        return res.status(404).json({ message: 'Country not found or no changes made' });
      }
      res.json({ message: 'Country updated successfully' });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async deleteCountry(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const success = await countryService.deleteCountry(id);
      if (!success) {
        return res.status(404).json({ message: 'Country not found' });
      }
      res.json({ message: 'Country deleted successfully' });
    } catch (error) {
      console.error('Error deleting country:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = new CountryController();
