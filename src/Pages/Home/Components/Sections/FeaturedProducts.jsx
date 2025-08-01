import React from 'react';
import { useLocation } from 'react-router-dom';
import Section from './Common/Section';
import Navbar from '../Navbar';
import Footer from '../Footer';
import LaptopImage from '../../../../Assets/laptop.jpg';

const featuredProducts = [
  {
    id: 1,
    name: 'MacBook Pro 16"',
    price: 1999.99,
    rating: 5,
    reviews: 128,
    image: LaptopImage,
    discount: 10,
    description: 'The ultimate laptop for professionals. Featuring a stunning Retina display, powerful M1 chip, and all-day battery life.'
  },
  {
    id: 2,
    name: 'Dell XPS 15',
    price: 1499.99,
    oldPrice: 1699.99,
    rating: 4,
    reviews: 89,
    image: LaptopImage,
    description: 'The ultimate laptop for professionals. Featuring a stunning Retina display, powerful M1 chip, and all-day battery life.'
  },
  {
    id: 3,
    name: 'Custom Gaming PC',
    price: 1899.99,
    rating: 5,
    reviews: 56,
    image: LaptopImage,
    discount: 15,
    description: 'The ultimate laptop for professionals. Featuring a stunning Retina display, powerful M1 chip, and all-day battery life.'
  },
  {
    id: 4,
    name: 'ASUS ROG Strix',
    price: 1299.99,
    rating: 4,
    reviews: 42,
    image: LaptopImage,
    description: 'The ultimate laptop for professionals. Featuring a stunning Retina display, powerful M1 chip, and all-day battery life.'
  },
  {
    id: 5,
    name: 'HP Spectre x360',
    price: 1199.99,
    oldPrice: 1349.99,
    rating: 4,
    reviews: 64,
    image: LaptopImage,
    discount: 12,
    description: 'The ultimate laptop for professionals. Featuring a stunning Retina display, powerful M1 chip, and all-day battery life.'
  }
];

const FeaturedProducts = ({ limit }) => {
  const location = useLocation();
  const isViewAllPage = location.pathname === '/featured-products';

  return (
    <div className="bg-white">
      <Navbar />

      {/* Apply mt-16 only when it's the view-all page */}
      <div className={isViewAllPage ? 'mt-16' : ''}>
        <Section
          title="Featured Products"
          viewAllLink="/featured-products"
          products={featuredProducts}
          id="featured-section"
          limit={limit}
        />
      </div>

      {isViewAllPage && <Footer />}
    </div>
  );
};

export default FeaturedProducts;
export { featuredProducts };
