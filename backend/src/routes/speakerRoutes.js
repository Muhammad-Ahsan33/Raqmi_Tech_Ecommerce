import express from "express";
import speakerController from "../controllers/speakerController.js";

const router = express.Router();

router.get("/speaker", speakerController.getspeakerbyfilter);

export default router;
