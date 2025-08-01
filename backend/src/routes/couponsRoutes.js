import router from 'express';
const {router} = express.Router();
import couponController from '../controllers/couponsController.js';

router.get('/', couponController.getUserCoupons);
router.post('/validate', couponController.validateCoupon);

export default router;