import React from 'react';
import { useLocation } from 'react-router-dom';
import Section from './Common/Section';
import Navbar from '../Navbar';
import Footer from '../Footer';
import LaptopImage from '../../../../Assets/laptop.jpg';

const laptopProducts = [
  {
    id: 9,
    name: 'Lenovo ThinkPad X1',
    price: 1299.99,
    rating: 4,
    reviews: 78,
    image: LaptopImage
  },
  {
    id: 10,
    name: 'HP Spectre x360',
    price: 1199.99,
    oldPrice: 1349.99,
    rating: 4,
    reviews: 64,
    image: LaptopImage,
    discount: 12
  },
  {
    id: 11,
    name: 'Acer Predator Helios',
    price: 1099.99,
    rating: 4,
    reviews: 92,
    image: LaptopImage
  },
  {
    id: 12,
    name: 'MSI GS66 Stealth',
    price: 1499.99,
    rating: 4,
    reviews: 56,
    image: LaptopImage
  },
  {
    id: 13,
    name: 'Apple MacBook Air M2',
    price: 999.99,
    rating: 5,
    reviews: 120,
    image: LaptopImage
  }
];

const Laptops = ({ limit }) => {
  const location = useLocation();
  const isViewAllPage = location.pathname === '/laptops';

  return (
    <div className="bg-white">
      <Navbar />

      {/* Apply mt-16 only when it's the view-all page */}
      <div className={isViewAllPage ? 'mt-16' : ''}>
        <Section
          title="Laptops"
          viewAllLink="/laptops"
          products={laptopProducts}
          id="laptop-section"
          limit={limit}
        />
      </div>

      {isViewAllPage && <Footer />}
    </div>
  );
};

export default Laptops;
export { laptopProducts };
