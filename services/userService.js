// services/userService.js
const { initDB } = require('../config/database');
const User = require('../models/userModel');

class UserService {
  constructor() {
    this.pool = null;
    this.init();
  }

  async init() {
    this.pool = await initDB();
  }

  async getAllUsers() {
    const [rows] = await this.pool.query('SELECT * FROM users');
    return rows.map(User.fromRow);
  }

  async getUserById(id) {
    const [rows] = await this.pool.query('SELECT * FROM users WHERE user_id = ?', [id]);
    if (rows.length === 0) return null;
    return User.fromRow(rows[0]);
  }

  async createUser(userData) {
    const { name, email, createdAt, updatedAt } = userData;
    const [result] = await this.pool.query(
      'INSERT INTO users (user_name, user_email, user_created_at, user_updated_at) VALUES (?, ?, ?, ?)',
      [name, email, createdAt, updatedAt]
    );
    const insertedUser = new User(result.insertId, name, email, createdAt, updatedAt);
    return insertedUser;
  }

  async updateUser(id, userData) {
    const { name, email } = userData;
    const [result] = await this.pool.query(
      'UPDATE users SET user_name = ?, user_email = ?, user_updated_at = NOW() WHERE user_id = ?',
      [name, email, id]
    );
    return result.affectedRows > 0;
  }

  async deleteUser(id) {
    const [result] = await this.pool.query('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = new UserService();
