import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Raqmi Tech</h3>
            <p className="text-gray-400 mb-4">
              Your one-stop destination for all computing needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FiYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white">Products</Link>
              </li>
              <li>
                <Link to="/deals" className="text-gray-400 hover:text-white">Deals & Offers</Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-400 hover:text-white">Support</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">About Us</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white">FAQs</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FiMapPin className="mt-1 mr-3 text-indigo-500 flex-shrink-0" />
                <span className="text-gray-400">123 Tech Street, Innovation City, TC 10101</span>
              </li>
              <li className="flex items-center">
                <FiPhone className="mr-3 text-indigo-500 flex-shrink-0" />
                <a href="tel:+1234567890" className="text-gray-400 hover:text-white">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center">
                <FiMail className="mr-3 text-indigo-500 flex-shrink-0" />
                <a href="mailto:support@raqmitech.com" className="text-gray-400 hover:text-white">support@raqmitech.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 mt-10 pt-8">
          <div className="max-w-md mx-auto md:mx-0">
            <h3 className="text-lg font-semibold mb-3">Subscribe to our Newsletter</h3>
            <p className="text-gray-400 mb-4">Get the latest updates, deals and special offers directly to your inbox.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 rounded-l-md focus:outline-none text-gray-900"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-r-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Raqmi Tech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;