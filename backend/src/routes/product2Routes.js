import express from "express";
import product from "../controllers/productController2.js";

const router = express.Router();

router.post("/product", product.add_product); // Add new product
router.get("/product", product.getAllProducts); // Get all products
// router.get("/product/filter", product.filterProducts); // Filter products
router.get("/product/:id", product.getProductById); // Get product details by ID
router.put("/product/:id", product.updateProduct); // Update product details
router.delete("/product/:id", product.deleteProduct); // Delete product

export default router;
