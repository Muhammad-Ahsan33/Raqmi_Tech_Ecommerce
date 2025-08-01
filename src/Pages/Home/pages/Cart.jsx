import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';  
import { useCart } from './CartContext'; 
import { 
  FiTrash2, 
  FiPlus, 
  FiMinus, 
  FiArrowLeft, 
  FiShoppingBag
} from 'react-icons/fi';

const Cart = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity 
  } = useCart();

  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 1000 ? 0 : 19.99;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;

  // Check if cart is valid to proceed to checkout
  const canProceedToCheckout = cartItems.length > 0;

  // Navigate to checkout page
  const handleProceedToCheckout = () => {
    if (canProceedToCheckout) {
      navigate('/checkout');
    } else {
      alert('Your cart is empty. Add items before proceeding.');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-12 mt-20">
        <h1 className="text-3xl font-bold text-indigo-600 mb-8 flex items-center">
          <FiShoppingBag className="mr-3" /> Your Shopping Cart
        </h1>
        
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md mx-auto">
            <FiShoppingBag className="mx-auto text-gray-400 mb-4" size={64} />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
            <Link 
              to="/" 
              className="bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors inline-flex items-center"
            >
              <FiArrowLeft className="mr-2" /> Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Cart Items ({cartItems.reduce((total, item) => total + item.quantity, 0)})
                  </h2>
                </div>
                <ul>
                  {cartItems.map(item => (
                    <li key={item.id} className="flex flex-col sm:flex-row py-6 px-6 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors">
                      <div className="flex-shrink-0 sm:mr-6 mb-4 sm:mb-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-24 h-24 object-cover rounded-md shadow-sm"
                        />
                      </div>
                      <div className="flex flex-1 flex-col sm:flex-row justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                          <p className="text-gray-600 mt-1">
                            {item.configuration} - {item.color}
                          </p>
                          <p className="text-gray-600 mt-1">Unit Price: ${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center mt-4 sm:mt-0">
                          <div className="flex border border-gray-300 rounded-md">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 border-r border-gray-300 hover:bg-gray-100 transition-colors"
                            >
                              <FiMinus size={14} />
                            </button>
                            <span className="px-4 py-1">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 border-l border-gray-300 hover:bg-gray-100 transition-colors"
                            >
                              <FiPlus size={14} />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="ml-4 text-red-500 hover:text-red-600 transition-colors"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="p-6">
                  <Link 
                    to="/" 
                    className="text-indigo-600 hover:text-indigo-800 flex items-center transition-colors"
                  >
                    <FiArrowLeft className="mr-2" /> Continue Shopping
                  </Link>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-800 font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-800 font-medium">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span className="text-gray-800 font-medium">${tax.toFixed(2)}</span>
                  </div>
                </div>
                <hr className="my-4 border-gray-200" />
                <div className="flex justify-between mb-6">
                  <span className="text-lg font-semibold text-gray-800">Total</span>
                  <span className="text-lg font-semibold text-indigo-600">${total.toFixed(2)}</span>
                </div>

                <button
                  onClick={handleProceedToCheckout}
                  disabled={!canProceedToCheckout}
                  className={`block w-full bg-indigo-600 text-white text-center py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors ${
                    !canProceedToCheckout ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />  
    </div>
  );
};

export default Cart;