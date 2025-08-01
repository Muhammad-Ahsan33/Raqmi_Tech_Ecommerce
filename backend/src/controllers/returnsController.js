import Return from '../models/returnModel.js';
import Order from '../models/orderModel.js';

const getUserReturns = async (req, res) => {
  try {
    const returns = await Return.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .populate('order');

    res.json(returns);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching returns', error: error.message });
  }
};

const createReturn = async (req, res) => {
  try {
    const { orderId, reason, itemsToReturn } = req.body;

    // Verify order belongs to user
    const order = await Order.findOne({ 
      _id: orderId, 
      userId: req.user._id 
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const returnRequest = new Return({
      userId: req.user._id,
      order: orderId,
      reason,
      itemsToReturn,
      status: 'pending'
    });

    await returnRequest.save();
    res.status(201).json(returnRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error creating return request', error: error.message });
  }
};

const getReturnDetails = async (req, res) => {
  try {
    const returnDetails = await Return.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    }).populate('order');

    if (!returnDetails) {
      return res.status(404).json({ message: 'Return not found' });
    }

    res.json(returnDetails);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching return details', error: error.message });
  }
};

export default {
  createReturn,
  getReturnDetails,
  getUserReturns
}
