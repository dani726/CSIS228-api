
const productService = require('../services/productService');

class ProductController {
    
  async getAllProducts(req, res) {
    try {
      const products = await productService.getAllProducts();
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getProudctById(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const product = await productService.getProductById(id);
      if (!product) {
        // the return will break.
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getProductByCategory(req, res){
    try{
      const cat_id = parseInt(req.params.cat_id, 10);
      const products = await productService.getProductByCategory(cat_id);
      if(!products){
        return res.status(404).json({status: 404, message: 'Product not found'});
      }
      res.status(200).json(products);
    }catch(e){
      console.error('Error fetching product by category id');
      res.status(500).json({message: 'Internal server error'});
    }
  }

  async createProduct(req, res) {
    try {
      const { name, description, price, qty, catId} = req.body;
      if (!name || !price) { // complete other fields
        return res.status(400).json({ message: 'Name and price are required' });
      }
      const newProduct = await productService.createProduct({ name, description, price, qty, catId });
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Error creating product:', error);
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

module.exports = new ProductController();
