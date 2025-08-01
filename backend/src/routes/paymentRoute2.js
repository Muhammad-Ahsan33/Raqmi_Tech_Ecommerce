import express from "express";
import pay from "../controllers/payment2Controoler.js";

const router = express.Router();

router.post("/create-payment-intent", pay.createPaymentIntent);
router.post("/confirm-payment", pay.confirmPayment);

export default router;
