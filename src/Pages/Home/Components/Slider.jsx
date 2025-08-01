import React, { useState, useEffect } from 'react';
import BannerImage from '../../../Assets/Banner.jpg';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Slider = () => {
  const slides = [
    {
      id: 1,
      image: BannerImage,
      alt: 'New Gaming Laptops'
    },
    {
      id: 2,
      image: BannerImage,
      alt: 'Build Your PC'
    },
    {
      id: 3,
      image: BannerImage,
      alt: 'Accessories Sale'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="relative w-full mt-16 md:mt-20 lg:mt-24" 
      style={{ marginTop: 'calc(4rem + 1vw)' }} 
    >
      <div className="overflow-hidden relative h-64 md:h-80 lg:h-96">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="w-full flex-shrink-0 relative">
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-64 md:h-80 lg:h-96 object-cover"
              />
     
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <h2 className="text-white text-2xl md:text-4xl font-bold text-center">
                  {slide.alt}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={goToPrevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 text-white transition-all"
      >
        <FiChevronLeft size={24} />
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 text-white transition-all"
      >
        <FiChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              currentSlide === index ? 'w-8 bg-indigo-600' : 'w-2 bg-white bg-opacity-50'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Slider;