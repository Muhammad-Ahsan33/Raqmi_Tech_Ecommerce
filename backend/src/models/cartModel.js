import {Schema , model} from 'mongoose';

const CartSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    items: [{
        productId: { 
            type: Schema.Types.ObjectId, 
            ref: 'Product', 
            required: true 
        },
        quantity: { 
            type: Number, 
            required: true, 
            min: 1,
            default: 1
        },
        price: { 
            type: Number, 
            required: true 
        }
    }],
    totalPrice: { 
        type: Number, 
        required: true,
        default: 0
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Middleware to update `updatedAt` before saving
CartSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const cartschema = new model('Cart' , CartSchema)

export default cartschema;
