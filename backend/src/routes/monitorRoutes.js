import express from "express";
import monitorController from "../controllers/monitorController.js";

const router = express.Router();

router.get("/monitor", monitorController.getmonitorbyfilter);

export default router;
