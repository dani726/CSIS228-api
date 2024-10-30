
class Country {
  constructor(id, name, abbr) {
    this.id = id;
    this.name = name;
    this.abbr = abbr
  }

  // Static method to map database row to User model
  // mapper to map the datafields from database to our user Model
  // the fields just like the database, we are mapping to js our own naming
  static fromRow(row) {
    return new Country(
      row.country_id,
      row.country_name,
      row.country_abbr,
    );
  }
}

module.exports = Country;
