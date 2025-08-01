import express from "express";
import keyboardController from "../controllers/keyboardController.js";

const router = express.Router();

router.get("/keyboard", keyboardController.getkeyboardbyfilter);

export default router;
