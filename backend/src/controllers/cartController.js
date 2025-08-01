import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js'; // Assuming you have a Product model


const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Fetch product details
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [], totalPrice: 0 });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity, price: product.price });
        }

        // Recalculate total price
        cart.totalPrice = cart.items.reduce((acc, item) => acc + item.quantity * item.price, 0);

        await cart.save();
        return res.status(200).json({ message: "Item added to cart", cart });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


const removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        let cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);

        // Recalculate total price
        cart.totalPrice = cart.items.reduce((acc, item) => acc + item.quantity * item.price, 0);

        await cart.save();
        return res.status(200).json({ message: "Item removed from cart", cart });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


const getCart = async (req, res) => {
    try {
        const { userId } = req.params;

        const cart = await Cart.findOne({ userId }).populate('items.productId', 'name price');
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        return res.status(200).json(cart);

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// 🧹 Clear Cart
const clearCart = async (req, res) => {
    try {
        const { userId } = req.body;

        let cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = [];
        cart.totalPrice = 0;

        await cart.save();
        return res.status(200).json({ message: "Cart cleared successfully", cart });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


export default {
    clearCart,
    addToCart,
    getCart,
    removeFromCart
}