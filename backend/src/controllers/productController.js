import Product from '../models/productModel.js';


  const createProduct = async (req, res) =>{
    try {
      const productData = req.body;
    // console.log("Inside Create Product");
      if (!productData) {
        return res.status(400).json({ error: 'Product data is required' });
      }
      const newProduct = new Product(productData);
      const savedProduct = await newProduct.save();
      res.status(201).json({ message: 'Product created successfully', product: savedProduct });
    } catch (error) {
      res.status(400).json({ error: 'Failed to create product', details: error.message });
    }
  }

  const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products', details: error.message });
    }
  }

  const getProductById = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: 'Product ID is required' });
      }
      const product = await Product.findOne({ id });
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ error: 'Failed to fetch product', details: error.message });
    }
  }

  const updateProduct = async(req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      if (!id) {
        return res.status(400).json({ error: 'Product ID is required' });
      }
      if (!updatedData) {
        return res.status(400).json({ error: 'Updated data is required' });
      }
      const updatedProduct = await Product.findOneAndUpdate({ id }, updatedData, { new: true });
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found for update' });
      }
      res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
      res.status(400).json({ error: 'Failed to update product', details: error.message });
    }
  }

  const deleteProduct = async(req, res) => {
    try {
      const  id  = req.body.id;
      if (!id) {
        return res.status(400).json({ error: 'Product ID is required' });
      }
      const deletedProduct = await Product.findOneAndDelete({ id });
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found for deletion' });
      }
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: 'Failed to delete product', details: error.message });
    }
  }

  // // Get total products by category
  // async getTotalProductByCategory(req, res) {
  //   try {
  //     const result = await Product.aggregate([
  //       {
  //         $group: {
  //           _id: "$masterCategory",
  //           totalProducts: { $sum: 1 },
  //         },
  //       },
  //     ]);
  //     res.status(200).json({ success: true, data: result });
  //   } catch (error) {
  //     res.status(500).json({ success: false, error: 'Error fetching total products by category', details: error.message });
  //   }
  // }

  // // Get all published products
  // async getPublishedProduct(req, res) {
  //   try {
  //     const publishedProducts = await Product.find({ isPublished: true });
  //     res.status(200).json({ success: true, data: publishedProducts });
  //   } catch (error) {
  //     res.status(500).json({ success: false, error: 'Error fetching published products', details: error.message });
  //   }
  // }

export default {
    createProduct,
    getAllProducts,
    getProductById,
    deleteProduct,
    updateProduct
} 