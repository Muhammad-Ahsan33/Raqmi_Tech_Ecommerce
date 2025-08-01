import express from 'express';
import paymentController from '../controllers/paymentController.js';
import auth from '../middlewares/authmiddleware.js';

const router = express.Router();

// Route to add a new payment
router.post('/payment', auth.isLoggedIn , auth.isAdmin , paymentController.addPayment);

// Route to get payment details by Payment ID
router.get('payment/:id', auth.isLoggedIn ,  paymentController.getPaymentById);

// Route to get all payments by a User ID
router.get('payment/user/:userId',auth.isLoggedIn ,  paymentController.getPaymentsByUserId);

// Route to update a payment status
router.put('payment/:id', auth.isLoggedIn , auth.isAdmin ,  paymentController.updatePaymentStatus);

// Route to delete a payment record
router.delete('payent/:id', auth.isLoggedIn , auth.isAdmin , paymentController.deletePayment);

export default router;
