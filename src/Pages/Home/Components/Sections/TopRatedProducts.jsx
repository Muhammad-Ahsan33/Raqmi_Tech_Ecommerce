import React from 'react';
import { useLocation } from 'react-router-dom';
import Section from './Common/Section';
import Navbar from '../Navbar';
import Footer from '../Footer';
import LaptopImage from '../../../../Assets/laptop.jpg';

const topRatedProducts = [
  {
    id: 5,
    name: 'Samsung 32" 4K Monitor',
    price: 399.99,
    rating: 5,
    reviews: 203,
    image: LaptopImage
  },
  {
    id: 6,
    name: 'Logitech MX Master 3',
    price: 99.99,
    rating: 5,
    reviews: 321,
    image: LaptopImage
  },
  {
    id: 7,
    name: 'HyperX Cloud II Headset',
    price: 89.99,
    oldPrice: 119.99,
    rating: 5,
    reviews: 567,
    image: LaptopImage,
    discount: 25
  },
  {
    id: 8,
    name: 'Corsair K95 RGB Keyboard',
    price: 149.99,
    rating: 5,
    reviews: 294,
    image: LaptopImage
  },
  {
    id: 9,
    name: 'Sony WH-1000XM4 Headphones',
    price: 349.99,
    rating: 5,
    reviews: 412,
    image: LaptopImage
  }
];

const TopRatedProducts = ({ limit }) => {
  const location = useLocation();
  const isViewAllPage = location.pathname === '/top-rated-products';

  return (
    <div className="bg-white">
      <Navbar />

      {/* Apply mt-16 only when it's the view-all page */}
      <div className={isViewAllPage ? 'mt-16' : ''}>
        <Section
          title="Top Rated Products"
          viewAllLink="/top-rated-products"
          products={topRatedProducts}
          id="top-rated-section"
          limit={limit}
        />
      </div>

      {isViewAllPage && <Footer />}
    </div>
  );
};

export default TopRatedProducts;
export { topRatedProducts };
