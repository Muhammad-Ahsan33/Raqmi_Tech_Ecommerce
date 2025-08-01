import Wishlist from '../models/wishlist.js';

const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ userId: req.user._id })
      .populate('product')
      .sort({ createdAt: -1 });

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist', error: error.message });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    // Check if product already in wishlist
    const existingWishlistItem = await Wishlist.findOne({ 
      userId: req.user._id, 
      product: productId 
    });

    if (existingWishlistItem) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }

    const wishlistItem = new Wishlist({
      userId: req.user._id,
      product: productId
    });

    await wishlistItem.save();
    res.status(201).json(wishlistItem);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to wishlist', error: error.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const wishlistItem = await Wishlist.findOneAndDelete({ 
      userId: req.user._id, 
      product: req.params.productId 
    });

    if (!wishlistItem) {
      return res.status(404).json({ message: 'Item not found in wishlist' });
    }

    res.json({ message: 'Item removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from wishlist', error: error.message });
  }
};


export default {
removeFromWishlist,
addToWishlist,
getWishlist,

}