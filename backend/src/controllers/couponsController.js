import Coupon from '../models/coupons.js';

const getUserCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({ 
      userId: req.user._id,
      status: { $in: ['active', 'unused'] },
      expiryDate: { $gt: new Date() }
    });

    res.json(coupons);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching coupons', error: error.message });
  }
};

const validateCoupon = async (req, res) => {
  try {
    const { couponCode } = req.body;

    const coupon = await Coupon.findOne({ 
      code: couponCode,
      userId: req.user._id,
      status: 'active',
      expiryDate: { $gt: new Date() }
    });

    if (!coupon) {
      return res.status(404).json({ message: 'Invalid or expired coupon' });
    }

    res.json({
      valid: true,
      discount: coupon.discount,
      code: coupon.code
    });
  } catch (error) {
    res.status(500).json({ message: 'Error validating coupon', error: error.message });
  }
};

export default {
  getUserCoupons,
  validateCoupon
}