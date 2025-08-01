import userController from '../controllers/userController.js';
import Auth from '../middlewares/authmiddleware.js';
import { Router } from 'express';
const router = Router();

router.post('/users' , Auth.isAdmin , Auth.isLoggedIn ,  userController.Adduser);
router.delete('/users/:name' , Auth.isAdmin , Auth.isLoggedIn, userController.RemoveUser_by_name);
router.delete('/users/:email' , Auth.isAdmin , Auth.isLoggedIn, userController.RemoveUser_by_email);
router.get('/users' , userController.getAllUsers);
router.get('/categories/:name' , userController.getUserby_name);
router.get('/categories/:email' , userController.getUserby_email);


export default router;