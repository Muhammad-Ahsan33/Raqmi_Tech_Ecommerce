import {Router} from 'express';
const router = Router();
import cartController from'../controllers/cartController.js';
import auth from'../middlewares/authmiddleware.js';

router.post('/add', auth.isLoggedIn , cartController.addToCart);
router.post('/remove', auth.isLoggedIn , cartController.removeFromCart);
router.get('/:userId', auth.isLoggedIn , cartController.getCart);
router.post('/clear', auth.isLoggedIn , cartController.clearCart);

export default router;
