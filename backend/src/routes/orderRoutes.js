import { Router } from 'express';
const router = Router();
import Order from '../controllers/orderController.js';
import Auth from '../middlewares/authmiddleware.js'


// Route to create a new order
router.post('orders',Auth.isLoggedIn , Auth.isAdmin , Order.CreateOrder);
// Route to retrieve all orders
router.get('orders/:id',Auth.isLoggedIn ,  Order.getorderbyuserid);

// Route to retrieve a specific order by ID
router.get('orders/:id',Auth.isLoggedIn ,  Order.getorderbyproductid);

router.get('orders', Auth.isLoggedIn , Order.getallorders);

// Route to update an order by ID
router.put('orders/:id', Auth.isLoggedIn , Auth.isAdmin , Order.updateorderstatus);

// Route to delete an order by ID
router.delete('orders/:id', Auth.isLoggedIn , Auth.isAdmin , Order.deleteorder);

export default router;