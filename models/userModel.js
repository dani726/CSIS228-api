const moment = require("moment");

class User {
  constructor(id, name, email, created_at, updated_at) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  // Static method to map database row to User model
  // mapper to map the datafields from database to our user Model
  static fromRow(row) {
    return new User(
      row.user_id,         // Map user_id to id
      row.user_name,       // Map user_name to name
      row.user_email,      // Map user_email to email
      moment(row.user_created_at).format("YYYY-MM-DD HH:mm:SS"), // Map user_created_at to created_at
      moment(row.user_updated_at).format("YY-MMM-DD hh:mm:ss")
    );
  }
}

module.exports = User;
