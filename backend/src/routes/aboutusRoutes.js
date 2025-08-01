import { Router } from "express";
import Aboutus from '../controllers/aboutController.js';
import auth from '../middlewares/authmiddleware.js'
const router = Router();

router.get("/aboutus" , auth.isLoggedIn ,  Aboutus.getAboutUs);
router.put("/aboutus" , auth.isLoggedIn , auth.isAdmin , Aboutus.updateAboutUs);

export default router;