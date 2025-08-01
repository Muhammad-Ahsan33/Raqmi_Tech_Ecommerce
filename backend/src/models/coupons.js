import {Schema , model} from 'mongoose';

const couponSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  discount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['active', 'unused', 'expired', 'used'],
    default: 'unused'
  },
  expiryDate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Coupon = model('Coupon', couponSchema);

export default Coupon;
