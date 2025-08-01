// routes/profileRoutes.js
import {router} from 'express';
const router = express.Router();
import profileController from '../controllers/profileController.js';

router.get('/', profileController.getUserProfile);
router.put('/', profileController.updateUserProfile);
router.patch('/change-password', profileController.changePassword);

export default router;