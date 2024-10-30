
class Product {
  constructor(id, name, description, price, qty, catId, catName) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.qty = qty;
    this.price = price;
    this.catId = catId;
    this.catName = catName;
  }

  static fromRow(row) {
    return new Product(
      row.product_id,
      row.name,
      row.description,
      row.price,
      row.stock_quantity,
      row.category_id,
      row.category_name
    );
  }
}

module.exports = Product;
