import inventoryController from '../controllers/inventoryController.js';
import Auth from '../middlewares/authmiddleware.js';
import { Router } from 'express';
const router = Router();

router.post('/invetory' , Auth.isLoggedIn , Auth.isAdmin ,  inventoryController.addInventoryItem);

// Route to get inventory details by product ID
router.get('/inventory/:id', Auth.isLoggedIn ,  inventoryController.getInventoryByProductId);

router.get('/inventory', Auth.isLoggedIn ,  inventoryController.getAllInventory);


// Route to update an inventory item by ID
router.put('/inventory/:id', Auth.isLoggedIn , Auth.isAdmin ,  inventoryController.updateInventory);

// Route to delete an inventory item by ID
router.delete('/inventory/:id',Auth.isLoggedIn , Auth.isAdmin ,  inventoryController.deleteInventoryItem);

export default router;
