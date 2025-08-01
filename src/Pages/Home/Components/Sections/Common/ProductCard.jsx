import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';
import { useCart } from '../../../../Home/pages/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      color: product.colors?.[0] || 'Default',
      configuration: product.availableConfigurations?.[0] 
        ? `${product.availableConfigurations[0].ram} / ${product.availableConfigurations[0].storage}` 
        : 'Default',
      image: product.image || product.images?.[0]
    };

    addToCart(cartItem);
    toast.success('Added to cart!');
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toast.info('Added to wishlist!');
  };

  const handleProductClick = () => {
    if (product.id) navigate(`/product/${product.id}`);
  };

  return (
    <div 
      onClick={handleProductClick}
      className="block bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer group"
    >
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-56 object-cover transform transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-bold px-3 py-1 rounded-full">
            -{product.discount}%
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="relative flex items-center">
            <button 
              onClick={handleAddToCart}
              className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white hover:scale-110 transition-all"
            >
              <FiShoppingCart className="text-gray-800" size={24} />
            </button>
          </div>
          
          <div className="relative flex items-center">
            <button 
              onClick={handleAddToWishlist}
              className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white hover:scale-110 transition-all"
            >
              <FiHeart className="text-gray-800" size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-2 truncate hover:text-indigo-600 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center mb-3">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <FiStar 
                key={i} 
                className={`${i < (product.rating || 0) ? 'fill-current' : ''}`} 
                size={18} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">
            ({product.reviews || 0} reviews)
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-indigo-600">
              ${product.price.toFixed(2)}
            </span>
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;