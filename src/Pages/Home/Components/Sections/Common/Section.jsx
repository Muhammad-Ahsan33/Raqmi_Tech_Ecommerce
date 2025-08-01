import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProductCard from './ProductCard';

const Section = ({ title, viewAllLink, products, id, limit }) => {
  const location = useLocation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Check if we're on the view-all page
  const isViewAllPage = location.pathname === viewAllLink;

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <section id={id} className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${isViewAllPage ? 'text-indigo-600' : 'text-gray-800'}`}>
            {title}
          </h2>
          {/* Only show View All if not on view-all page */}
          {!isViewAllPage && viewAllLink && (
            <Link 
              to={viewAllLink} 
              className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
            >
              View All
            </Link>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, limit || products.length).map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={() => handleProductClick(product)}
            />
          ))}
        </div>
      </div>

    </section>
  );
};

export default Section;