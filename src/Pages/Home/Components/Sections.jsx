import React from 'react';
import FeaturedProducts from './Sections/FeaturedProducts';
import TopRatedProducts from './Sections/TopRatedProducts';
import Laptops from './Sections/Laptops';
import Desktops from './Sections/Desktops';

const Sections = () => {
  return (
    <div className="bg-gray-50">
      <FeaturedProducts limit={4} />
      <TopRatedProducts limit={4} /> 
      <Laptops limit={4} /> 
      <Desktops limit={4} />
    </div>
  );
};

export default Sections;