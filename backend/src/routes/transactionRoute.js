// routes/transactionRoutes.js
import {Router} from 'express';
const router = Router();
import transactionController from '../controllers/transactionsController.js';

router.get('/', transactionController.getUserTransactions);
router.get('/:id', transactionController.getTransactionDetails);

export default router;