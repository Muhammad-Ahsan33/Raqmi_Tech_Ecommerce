import { Schema, model } from 'mongoose';

const reviewSchema = new Schema({

    comment:{
        type: String,
        reuiqred: true
    },

    product: { 
        type: Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
    },

    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
},
    {timestamps: true }
);

const Review = model('Review', reviewSchema);

export default Review;