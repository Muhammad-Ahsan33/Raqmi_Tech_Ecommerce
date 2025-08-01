import homepageController from '../controllers/homeController.js';
// import Auth from '../middlewares/authmiddleware.js';
import { Router } from 'express';
const router = Router();

// router.post('/categories' , Auth.isAdmin , Auth.isLoggedIn ,  categoryController.AddCategory);
// router.delete('/categories/:id' , Auth.isAdmin , Auth.isLoggedIn, categoryController.RemoveCategory);
router.get("/homepage" , homepageController.getHomePage);
router.put("/homepage" , homepageController.updateHomePage);
// router.get('/categories/:id' , Auth.isLoggedIn , reviewController.getreviewbyid);

export default router;
