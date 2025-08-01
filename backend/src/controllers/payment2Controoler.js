import Stripe from "stripe";
import dotenv from "dotenv";
import Payment from "../models/paymentModle.js";

// Load environment variables
dotenv.config();

// Initialize Stripe with Secret Key from .env
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create a PaymentIntent
const createPaymentIntent = async (req, res) => {
    try {
        const { userId, orderId, amount, paymentMethod } = req.body;

        if (!userId || !orderId || !amount || !paymentMethod) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        let stripePaymentMethod;
        switch (paymentMethod) {
            case "Credit Card":
                stripePaymentMethod = "card";
                break;
            case "PayPal":
                stripePaymentMethod = "paypal";
                break;
            case "Bank Transfer":
                stripePaymentMethod = "bank_transfer"; // Placeholder, Stripe requires extra setup
                break;
            case "Cash":
                // Directly save payment as "Completed" since no online transaction is required
                const cashPayment = new Payment({
                    userId,
                    orderId,
                    amount,
                    paymentMethod,
                    status: "Completed",
                    transactionId: "CASH-" + new Date().getTime(), // Generate a unique ID
                });

                await cashPayment.save();
                return res.status(200).json({
                    message: "Cash payment recorded successfully",
                    payment: cashPayment
                });

            default:
                return res.status(400).json({ error: "Invalid payment method" });
        }

        // Create payment intent only for online payments
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convert to cents
            currency: "usd",
            payment_method_types: [stripePaymentMethod],
        });

        // Save the payment in the database
        const newPayment = new Payment({
            userId,
            orderId,
            amount,
            paymentMethod,
            status: "Pending",
            transactionId: paymentIntent.id, // Store Stripe paymentIntent ID
        });

        await newPayment.save();

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
            message: "Payment intent created successfully"
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
};
// Confirm a PaymentIntent
const confirmPayment = async (req, res) => {
    try {
        const { paymentIntentId } = req.body;

        if (!paymentIntentId) {
            return res.status(400).json({ error: "Payment Intent ID is required" });
        }

        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (!paymentIntent) {
            return res.status(404).json({ error: "Payment Intent not found" });
        }

        if (paymentIntent.status === "succeeded") {
            // Update payment status in the database
            const updatedPayment = await Payment.findOneAndUpdate(
                { transactionId: paymentIntentId },
                { status: "Completed" },
                { new: true }
            );

            if (!updatedPayment) {
                return res.status(404).json({ error: "Payment record not found" });
            }

            return res.status(200).json({
                message: "Payment confirmed successfully",
                payment: updatedPayment
            });
        } else {
            return res.status(400).json({ error: "Payment not completed yet" });
        }

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
};


export default{
    confirmPayment,
    createPaymentIntent
}