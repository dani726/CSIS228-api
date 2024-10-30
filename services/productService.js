const { initDB } = require('../config/database');
const Product = require('../models/productModel');

class ProductService {
  constructor() {
    this.pool = null;
    this.init();
  }

  async init() {
    this.pool = await initDB();
  }

  async getAllProducts() {
    try{
      const [rows] = await this.pool.query(`SELECT 
        product_id, 
        products.name as product_name, 
        products.description as product_description, 
        products.price as product_price,
        stock_quantity,
        products.category_id,
        categories.name as category_name 
        FROM
        products
        JOIN
        categories ON products.category_id = categories.category_id;`);
        return rows.map(Product.fromRow);
    }catch(e){
      // propagate error to the controller
      throw new Error();
    }
  }

  async getProductById(id) {
    try{
      const [rows] = await this.pool.query(`SELECT 
        product_id, 
        products.name as product_name, 
        products.description as product_description, 
        products.price as product_price,
        stock_quantity,
        products.category_id,
        categories.name as category_name
    FROM
        products
            JOIN
        categories ON products.category_id = categories.category_id
        WHERE product_id = ?`, [id]);
        if (rows.length === 0) return null;
        return Product.fromRow(rows[0]);
    }catch(e){
      throw new Error();
    }
  }

  async getProductByCategory(id) {
    try{
      const [rows] = await this.pool.query(`SELECT 
        product_id, 
        products.name as product_name, 
        products.description as product_description, 
        products.price as product_price,
        stock_quantity,
        products.category_id,
        categories.name as category_name
    FROM
        products
            JOIN
        categories ON products.category_id = categories.category_id
        WHERE  category_id = ?`, [id]);
        if (rows.length === 0) return null;
        return Product.fromRow(rows[0]);
    }catch(e){
      throw new Error();
    }
  }

  async createProduct(productData) {
    const { name, description, price, qty, catId } = productData;
    const [result] = await this.pool.query(
      `INSERT INTO products 
      (name, description, price, stock_quantity, category_id) 
      VALUES (?, ?, ?, ?, ?)`,
      [name, description, price, qty, catId]
    );
    // the result.insertId is from the mysql2 library which 
    // returns for me the id that was inserted
    const newProduct = this.getProductById(result.insertId);

    return Product.fromRow(newProduct);
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

module.exports = new ProductService();
