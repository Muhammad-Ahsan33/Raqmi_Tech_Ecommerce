import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useCart } from './CartContext';
import {
  FiShoppingCart,
  FiHeart,
  FiStar,
  FiMinus,
  FiPlus,
  FiChevronLeft
} from 'react-icons/fi';

const ProductDetails = ({ products }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCart();

  // State for product and selections
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedConfig, setSelectedConfig] = useState(null);

  // Fetch product details when component mounts or products change
  useEffect(() => {
    // Ensure products exist and convert id to number
    const productId = Number(id);

    if (products && products.length > 0) {
      const foundProduct = products.find(p => p.id === productId);

      if (foundProduct) {
        setProduct(foundProduct);

        // Set default color and configuration
        setSelectedColor(foundProduct.colors?.[0] || null);
        setSelectedConfig(foundProduct.availableConfigurations?.[0] || null);
      } else {
        // Redirect if product not found
        navigate('/');
      }
    }
  }, [id, products, navigate]);

  // If product is not loaded yet
  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-indigo-500"></div>
      </div>
    );
  }

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      color: selectedColor || 'Default',
      configuration: selectedConfig
        ? `${selectedConfig.ram} / ${selectedConfig.storage}`
        : 'Default',
      image: product.image || product.images?.[0]
    };

    addToCart(cartItem);
    navigate('/cart');
  };

  return (
    <div className="bg-gray-50 min-h-screen ">
      <Navbar />
      <div className="container mx-auto px-4 py-12 mt-20">
        {/* Back Navigation */}
        <Link
          to="/"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
        >
          <FiChevronLeft className="mr-2" /> Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-10 bg-white rounded-xl shadow-lg p-8">
          {/* Product Image Gallery */}
          <div>
            <div className="mb-4 rounded-lg overflow-hidden shadow-md">
              <img
                src={product.images?.[activeImage] || product.image}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Thumbnail Navigation */}
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`
                      w-20 h-20 rounded-lg overflow-hidden border-2 
                      ${activeImage === index ? 'border-indigo-600' : 'border-transparent'}
                      hover:border-indigo-300 transition-all
                    `}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {product.name}
              </h1>
              <p className="text-gray-500">Brand: {product.brand}</p>
            </div>

            {/* Ratings */}
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`${i < Math.floor(product.rating || 0) ? 'fill-current' : ''}`}
                  />
                ))}
              </div>
              <span className="text-gray-500">
                {product.rating ? `(${product.rating})` : ''}
                {product.reviews ? `- ${product.reviews} Reviews` : ''}
              </span>
            </div>

            {/* Pricing */}
            <div className="flex items-center mb-4">
              <span className="text-3xl font-bold text-indigo-600 mr-4">
                ${product.price.toFixed(2)}
              </span>
              {product.oldPrice && (
                <>
                  <span className="line-through text-gray-400 mr-2">
                    ${product.oldPrice.toFixed(2)}
                  </span>
                  <span className="text-green-600 font-semibold">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Color</h3>
                <div className="flex space-x-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`
                        w-10 h-10 rounded-full border-2 
                        ${selectedColor === color ? 'border-indigo-600' : 'border-gray-300'}
                        hover:border-indigo-400 transition-all
                      `}
                      style={{
                        backgroundColor: color.toLowerCase() === 'black' ? '#000' :
                          color.toLowerCase() === 'silver' ? '#c0c0c0' :
                            color.toLowerCase() === 'white' ? '#fff' : color
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Configuration Selection */}
            {product.availableConfigurations && product.availableConfigurations.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Configuration</h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.availableConfigurations.map((config) => (
                    <button
                      key={`${config.ram}-${config.storage}`}
                      onClick={() => setSelectedConfig(config)}
                      className={`
                        border-2 rounded-lg p-3 text-left
                        ${selectedConfig === config
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-800'
                          : 'border-gray-300 hover:border-indigo-400'}
                        transition-all
                      `}
                    >
                      <div className="font-medium">
                        {config.ram} / {config.storage}
                      </div>
                      <div className="text-sm text-gray-500">
                        ${config.price ? config.price.toFixed(2) : product.price.toFixed(2)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {product.description && (
              <p className="text-gray-600 mb-6">
                {product.description}
              </p>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => handleQuantityChange('decrease')}
                  className="p-2 hover:bg-gray-100 rounded-l-lg"
                >
                  <FiMinus />
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange('increase')}
                  className="p-2 hover:bg-gray-100 rounded-r-lg"
                >
                  <FiPlus />
                </button>
              </div>

              {product.inStock ? (
                <span className="text-green-600 font-medium">In Stock</span>
              ) : (
                <span className="text-red-600 font-medium">Out of Stock</span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <FiShoppingCart className="mr-2" /> Add to Cart
              </button>
              <button
                className="w-full border-2 border-indigo-600 text-indigo-600 py-3 rounded-lg hover:bg-indigo-50 transition-colors flex items-center justify-center"
              >
                <FiHeart className="mr-2" /> Add to Wishlist
              </button>
            </div>
          </div>
        </div>

        {/* Specifications Section */}
        {product.specifications && product.specifications.length > 0 && (
          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Full Specifications</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {product.specifications.map((spec, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-50 p-3 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  <span className="mr-3 text-indigo-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="text-gray-700">{spec}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;