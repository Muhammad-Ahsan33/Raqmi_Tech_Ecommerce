import express from "express";
import headphonesController from "../controllers/headphoneController.js";

const router = express.Router();

router.get("/headphones", headphonesController.getheadphonesbyfilter);

export default router;
