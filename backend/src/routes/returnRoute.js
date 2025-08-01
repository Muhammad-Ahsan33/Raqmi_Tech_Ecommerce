// routes/returnRoutes.js
import {Router} from 'express';
const router = Router();
import returnController from '../controllers/returnsController.js';

router.get('/', returnController.getUserReturns);
router.post('/', returnController.createReturn);
router.get('/:id', returnController.getReturnDetails);

export default router;