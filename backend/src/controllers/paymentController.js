  import Payment from '../models/paymentModle.js';

// ✅ Add a new payment
const addPayment = async (req, res) => {
    try {
        const newPayment = new Payment(req.body);
        await newPayment.save();
        return res.status(201).json(newPayment);
    } catch (error) {
        res.status(500).json({ message: 'Error processing payment', error });
    }
};

const getPaymentById = async (req, res) => {
    try {
        const paymentId = req.params.id;

        if (!paymentId) {
            return res.status(400).json({ error: 'Payment ID not provided' });
        }

        const payment = await Payment.findById(paymentId);
        if (!payment) return res.status(404).json({ message: 'Payment not found' });

       return res.status(200).json(payment);
    } catch (error) {
       return res.status(500).json({ message: 'Error fetching payment details', error });
    }
};

const getPaymentsByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            return res.status(400).json({ error: 'User ID not provided' });
        }

        const payments = await Payment.find({ userId });
        if (!payments.length) return res.status(404).json({ message: 'No payments found for this user' });

       return  res.status(200).json(payments);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching user payments', error });
    }
};

const updatePaymentStatus = async (req, res) => {
    try {
        const paymentId = req.params.id;
        const { status } = req.body;

        if (!paymentId || !status) {
            return res.status(400).json({ error: 'Payment ID and status are required' });
        }

        const updatedPayment = await Payment.findByIdAndUpdate(paymentId, { status }, { new: true });

        if (!updatedPayment) return res.status(404).json({ message: 'Payment not found' });

        return res.status(200).json(updatedPayment);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating payment status', error });
    }
};

const deletePayment = async (req, res) => {
    try {
        const paymentId = req.params.id;

        if (!paymentId) {
            return res.status(400).json({ error: 'Payment ID not provided' });
        }

        const deletedPayment = await Payment.findByIdAndDelete(paymentId);

        if (!deletedPayment) return res.status(404).json({ message: 'Payment not found' });

        res.status(200).json({ message: 'Payment record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting payment record', error });
    }
};

export default{
    addPayment,
    getPaymentById,
    deletePayment,
    updatePaymentStatus,
    getPaymentsByUserId
}