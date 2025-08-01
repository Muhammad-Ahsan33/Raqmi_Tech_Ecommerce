import categoryController from '../controllers/categoryController.js';
import Auth from '../middlewares/authmiddleware.js';
import { Router } from 'express';
const router = Router();

router.post('/categories' , Auth.isAdmin , Auth.isLoggedIn ,  categoryController.AddCategory);
router.delete('/categories/:id' , Auth.isAdmin , Auth.isLoggedIn, categoryController.RemoveCategory);
router.get('/categories' , categoryController.getAllCategory);
router.get('/categories/:id' , categoryController.getCategorybyname);

export default router;
