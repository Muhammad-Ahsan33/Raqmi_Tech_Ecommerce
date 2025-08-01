// routes/wishlistRoutes.js
import { Router } from 'express';
const router = Router();
import wishlistController from'../controllers/wishlistController.js';

router.get('/wishlist', wishlistController.getWishlist);
router.post('/wishlist', wishlistController.addToWishlist);
router.delete('/wishlist/:productId', wishlistController.removeFromWishlist);

export default router;