import express from "express";
import mouseController from "../controllers/mouseController.js";

const router = express.Router();

router.get("/mouse", mouseController.getmousebyfilter);

export default router;
