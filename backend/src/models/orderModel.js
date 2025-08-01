import { Schema, model } from 'mongoose';

const orderSchema = new Schema({

    Id: {
        type: Number,
        required: true,
        unique: true
    },

    price: {
        type: Number,
        required: true
    },
    
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    productIds: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    }],
    orderStatus: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = model('Order', orderSchema);

export default Order;
