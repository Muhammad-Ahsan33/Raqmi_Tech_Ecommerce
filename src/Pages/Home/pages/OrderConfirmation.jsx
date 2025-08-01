import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const OrderConfirmation = () => {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState(null);

  // Sample data for confirmation (in a real app, this would come from a backend API or global state)
  useEffect(() => {
    // For simplicity, we're using the location state passed from the previous page
    if (location.state) {
      setOrderDetails(location.state.order); // Assume the order details are passed in location state
    } else {
      // If no order details are available, show a fallback message
      setOrderDetails(null);
    }
  }, [location.state]);

  if (!orderDetails) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-indigo-600 mb-8">Order Confirmation</h1>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <FiCheckCircle className="mx-auto text-green-600 mb-4" size={64} />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Order Not Found</h2>
            <p className="text-gray-500 mb-6">We couldn't find your order details. Please try again later.</p>
            <Link
              to="/"
              className="bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors inline-flex items-center"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-12 mt-20">
        <h1 className="text-3xl font-bold text-indigo-600 mb-8">Order Confirmation</h1>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <FiCheckCircle className="mx-auto text-green-600 mb-4" size={64} />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Thank you for your purchase!</h2>
            <p className="text-gray-500 mb-6">Your order has been successfully placed.</p>
            <p className="text-gray-600">Order Number: <span className="font-semibold">{orderDetails.orderNumber}</span></p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-6">Order Summary</h3>
            <div className="space-y-4">
              {orderDetails.items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <hr className="my-4 border-gray-200" />
              <div className="flex justify-between">
                <span className="font-semibold text-lg">Subtotal</span>
                <span className="font-semibold text-lg">${orderDetails.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-lg">Shipping</span>
                <span className="font-semibold text-lg">
                  {orderDetails.shipping === 0 ? 'Free' : `$${orderDetails.shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-lg">Tax</span>
                <span className="font-semibold text-lg">${orderDetails.tax.toFixed(2)}</span>
              </div>
              {orderDetails.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span className="font-semibold text-lg">Discount</span>
                  <span className="font-semibold text-lg">-${orderDetails.discount.toFixed(2)}</span>
                </div>
              )}
            </div>
            <hr className="my-4 border-gray-200" />
            <div className="flex justify-between mb-6">
              <span className="text-xl font-semibold text-gray-800">Total</span>
              <span className="text-xl font-semibold text-indigo-600">
                ${(orderDetails.total).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/"
              className="bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors inline-flex items-center"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
