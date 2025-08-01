import { Schema, model } from 'mongoose';

const paymentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true, enum: ['Credit Card', 'PayPal', 'Bank Transfer', 'Cash'] },
    status: { type: String, required: true, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
    transactionId: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now }
});

const Payment = model('Payment', paymentSchema);

export default Payment;
