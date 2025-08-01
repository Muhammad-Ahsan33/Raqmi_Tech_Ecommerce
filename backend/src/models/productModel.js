import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
    product_name: { type: String, required: true },
    category: { type: String, required: true },
    sub_category: { type: String, required: true },
    discounted_price: { type: Number, required: true },
    actual_price: { type: Number, required: true },
    discount_percentage: { type: Number, required: true },
    rating: { type: Number, min: 0, max: 5 },
    rating_count: { type: Number, default: 0 },
    description: { type: String },
    product_link: { type: String },
    refresh_rate: { type: String },
    resolution: { type: String },
    size: { type: String },
    connectivity: { type: String },
    switch: { type: String },
    microphone: { type: Boolean, default: false },
    tracking_method: { type: String },
    max_dpi: { type: Number },
    frequency_response: { type: String },
    wattage: { type: Number }
}, { timestamps: true });

const Product = model('Product', ProductSchema)

export default Product;