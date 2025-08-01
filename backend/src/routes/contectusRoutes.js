import express from "express";
import contectus from "../controllers/contectusController.js";
import auth from '../middlewares/authmiddleware.js'

const router = express.Router();

router.get("/", auth.isLoggedIn ,  contectus.getContactInfo); // Get Contact Us page details
router.put("/", auth.isLoggedIn , contectus.updateContactInfo); // Update Contact Us details (Admin)
router.post("/query", auth.isLoggedIn, contectus.submitQuery); // Submit a user query
router.get("/queries", auth.isLoggedIn , contectus.getQueries); // Get all user queries (Admin)

export default router;
