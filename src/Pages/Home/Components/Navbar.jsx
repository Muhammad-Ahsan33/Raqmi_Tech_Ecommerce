import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiShoppingCart, 
  FiMenu, 
  FiX, 
  FiSearch, 
  FiUser,
  FiChevronDown,
  FiImage,
  FiTrash 
} from 'react-icons/fi';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Scroll effect and dropdown management
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  // Update handleSearch function
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
    setSearchQuery('');
  };

  // Update handleImageSearch function
  const handleImageSearch = (e) => {
    e.preventDefault();
    if (selectedImage) {
      // For image search, you might want to handle differently
      navigate('/search?type=image');
      // Here you would typically send the image to your backend
      console.log('Performing visual search with image:', selectedImage);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <nav 
      className={`
        fixed w-full top-0 z-50 transition-all duration-300
        ${isScrolled ? 'bg-indigo-700 shadow-lg' : 'bg-indigo-600'}
        text-white py-4 sm:py-1 md:py-1
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-extrabold tracking-tight 
            bg-gradient-to-r from-white to-indigo-200 
            bg-clip-text text-transparent"
          >
            Raqmi Tech
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Dropdown Navigation */}
            <div className="relative group" ref={dropdownRef}>
              <button 
                onClick={() => toggleDropdown('products')}
                className="flex items-center font-medium hover:text-indigo-200 transition"
              >
                Products <FiChevronDown className="ml-1" />
              </button>
              {activeDropdown === 'products' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-xl">
                  <button 
                    onClick={() => scrollToSection('laptop-section')}
                    className="block w-full px-4 py-2 text-left hover:bg-indigo-50"
                  >
                    Laptops
                  </button>
                  <button 
                    onClick={() => scrollToSection('desktop-section')}
                    className="block w-full px-4 py-2 text-left hover:bg-indigo-50"
                  >
                    Desktops
                  </button>
                </div>
              )}
            </div>

            {/* Section Links */}
            <button
              onClick={() => scrollToSection('top-rated-section')}
              className="relative group font-medium hover:text-indigo-200 transition"
            >
              Top Rated Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </button>

            <button
              onClick={() => scrollToSection('featured-section')}
              className="relative group font-medium hover:text-indigo-200 transition"
            >
              Featured Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </button>

            {/* Search and Icons */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="px-3 py-1 rounded-l-full text-gray-800 focus:outline-none w-48"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-white text-indigo-600 p-2 rounded-r-full hover:bg-gray-100"
                  >
                    <FiSearch size={16} />
                  </button>
                </form>
              </div>

              {/* Visual Search */}
              <div className="relative">
                <label 
                  htmlFor="visual-search"
                  className="cursor-pointer p-2 rounded-full transition"
                >
                  <FiImage size={20} />
                </label>
                <input
                  id="visual-search"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                {selectedImage && (
                  <div className="absolute top-12 right-0 bg-white p-4 rounded-lg shadow-lg w-64">
                    <div className="relative">
                      <img 
                        src={selectedImage} 
                        alt="Selected for visual search" 
                        className="w-full h-auto mb-2 rounded"
                      />
                      <button
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <FiTrash size={14} />
                      </button>
                    </div>
                    <button
                      onClick={handleImageSearch}
                      className="w-full bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                    >
                      Search with Image
                    </button>
                  </div>
                )}
              </div>

              {/* User and Cart Icons */}
              <div className='flex pl-3 gap-2'>
              <Link 
                to="/account" 
                className="hover:bg-indigo-700 p-2 rounded-full transition"
              >
                <FiUser size={20} />
              </Link>
              
              <Link 
                to="/cart" 
                className="hover:bg-indigo-700 p-2 rounded-full transition relative"
              >
                <FiShoppingCart size={20} />
              </Link>

              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <FiShoppingCart size={24} />
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-600 pb-4 px-4 absolute w-full">
          <div className="mb-4 mt-3">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-l-md text-gray-800 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-white text-indigo-600 p-2 rounded-r-md hover:bg-gray-100"
              >
                <FiSearch size={24} />
              </button>
            </form>
          </div>

          {/* Mobile Visual Search */}
          <div className="mb-4">
            <label 
              htmlFor="mobile-visual-search"
              className="block w-full bg-indigo-700 text-white px-4 py-2 rounded-md text-center cursor-pointer"
            >
              <FiImage className="inline-block mr-2" />
              Upload Image for Search
            </label>
            <input
              id="mobile-visual-search"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            {selectedImage && (
              <div className="mt-2 bg-white p-3 rounded-lg">
                <div className="relative">
                  <img 
                    src={selectedImage} 
                    alt="Selected for visual search" 
                    className="w-full h-auto mb-2 rounded"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    <FiTrash size={14} />
                  </button>
                </div>
                <button
                  onClick={handleImageSearch}
                  className="w-full bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                >
                  Search with Image
                </button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <button
              onClick={() => scrollToSection('laptop-section')}
              className="w-full text-left px-4 py-2 hover:bg-indigo-700 rounded"
            >
              Laptops
            </button>
            <button
              onClick={() => scrollToSection('desktop-section')}
              className="w-full text-left px-4 py-2 hover:bg-indigo-700 rounded"
            >
              Desktops
            </button>
            <button
              onClick={() => scrollToSection('top-rated-section')}
              className="w-full text-left px-4 py-2 hover:bg-indigo-700 rounded"
            >
              Top Rated Products
            </button>
            <button
              onClick={() => scrollToSection('featured-section')}
              className="w-full text-left px-4 py-2 hover:bg-indigo-700 rounded"
            >
              Featured Products
            </button>
            <Link
              to="/account"
              className="block w-full text-left px-4 py-2 hover:bg-indigo-700 rounded"
            >
              My Account
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;