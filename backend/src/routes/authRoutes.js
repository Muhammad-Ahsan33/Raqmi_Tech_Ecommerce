import {router} from 'express';
const router = express.Router();
import authcontroller from '../controllers/authController.js';

// const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/register', authcontroller.register);
router.post('/login', authcontroller.login);
router.post('/google-login', authcontroller.googleLogin);
router.post('/forgot-password', authcontroller.forgotPassword);
router.post('/reset-password', authcontroller.resetPassword);

export default router; 