const { initDB } = require('../config/database');
const Country = require('../models/countryModel');

class CountryService {
  constructor() {
    this.pool = null;
    this.init();
  }

  async init() {
    this.pool = await initDB();
  }

  async getAllCountries() {
    const [rows] = await this.pool.query('SELECT * FROM ref_country');
    return rows.map(Country.fromRow);
  }

  async getCountryById(id) {
    const [rows] = await this.pool.query('SELECT * FROM ref_country WHERE country_id = ?', [id]);
    if (rows.length === 0) return null;
    return Country.fromRow(rows[0]);
  }

  async createCountry(countryData) {
    const { name, abbr } = countryData;
    const [result] = await this.pool.query(
      'INSERT INTO ref_country (country_name, country_abbr) VALUES (?, ?)',
      [name, abbr]
    );
    const insertedCountry = new Country(result.insertId, name, abbr);
    return insertedCountry;
  }

  async updateCountry(id, countryData) {
    // extract data from obj
    const { name, abbr } = countryData;
    const [result] = await this.pool.query(
      'UPDATE ref_country SET country_name = ?, country_abbr = ? WHERE country_id = ?',
      [name, abbr, id]
    );
    return result.affectedRows > 0;
  }

  async deleteCountry(id) {
    const [result] = await this.pool.query('DELETE FROM ref_country WHERE country_id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = new CountryService();
