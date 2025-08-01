import React from 'react';
import { useLocation } from 'react-router-dom';
import Section from './Common/Section';
import Navbar from '../Navbar';
import Footer from '../Footer';
import LaptopImage from '../../../../Assets/laptop.jpg';

const desktopProducts = [
  {
    id: 13,
    name: 'HP Pavilion Desktop',
    price: 799.99,
    rating: 4,
    reviews: 42,
    image: LaptopImage
  },
  {
    id: 14,
    name: 'Dell Inspiron Desktop',
    price: 699.99,
    oldPrice: 799.99,
    rating: 4,
    reviews: 35,
    image: LaptopImage,
    discount: 12
  },
  {
    id: 15,
    name: 'Corsair Vengeance i7200',
    price: 2199.99,
    rating: 5,
    reviews: 28,
    image: LaptopImage
  },
  {
    id: 16,
    name: 'Apple Mac Mini M1',
    price: 699.99,
    rating: 5,
    reviews: 87,
    image: LaptopImage
  },
  {
    id: 17,
    name: 'Custom Gaming PC',
    price: 1899.99,
    rating: 5,
    reviews: 56,
    image: LaptopImage,
    discount: 15
  }
];

const Desktops = ({ limit }) => {
  const location = useLocation();
  const isViewAllPage = location.pathname === '/desktops';  // Check if it's the view-all page

  return (
    <div className="bg-white">
      <Navbar />

      {/* Apply mt-16 only when it's the view-all page */}
      <div className={isViewAllPage ? 'mt-16' : ''}>
        <Section
          title="Desktops"
          viewAllLink="/desktops"
          products={desktopProducts}
          id="desktop-section"
          limit={limit}
        />
      </div>

      {isViewAllPage && <Footer />}
    </div>
  );
};

export default Desktops;
export { desktopProducts };
