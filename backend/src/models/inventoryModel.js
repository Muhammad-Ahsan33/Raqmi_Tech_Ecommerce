import { Schema, model } from 'mongoose';

const inventorySchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    supplier: { type: String },
    lastUpdated: { type: Date, default: Date.now },
});

const inventory = model('inventory', inventorySchema);

export default inventory;
