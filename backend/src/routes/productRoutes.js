import { Router } from 'express';
import Auth from '../middlewares/authmiddleware.js';
import ProductroductController from '../controllers/productController.js';
const router = Router();
// import  createProduct from '../controllers/productController.js';
// import validateProduct from '../middlewares/validateProduct.js';
// const { isLoggedIn, isAdmin } = require('../middlewares/authmiddleware.js').default;

// Routes for Product CRUD operations
// router.post('/products',createProduct);
// router.put('/products/:id', isLoggedIn, isAdmin, validateProduct, updateProduct);
// router.delete('/products/:id', isLoggedIn, isAdmin, validateProduct, deleteProduct);
// router.get('/products', isLoggedIn, getAllProducts);
// router.get('/products/:id', isLoggedIn, getProductById);
// router.get('/products/total-by-category', isLoggedIn, getTotalProductByCategory);

router.post('/products' ,Auth.isAdmin , Auth.isLoggedIn , ProductroductController.createProduct);
router.put('/products/:id' ,Auth.isAdmin , Auth.isLoggedIn , ProductroductController.updateProduct);
router.delete('/products/:id' ,Auth.isAdmin , Auth.isLoggedIn , ProductroductController.deleteProduct);
router.get('/products' ,ProductroductController.getAllProducts);
router.get('/products/:id' ,ProductroductController.getProductById);
// router.get('/products/total-by-category');

export default router;
