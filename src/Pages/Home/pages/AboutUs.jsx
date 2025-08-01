import React from 'react';
import { FiUsers, FiTruck, FiThumbsUp, FiAward } from 'react-icons/fi';
import LaptopImage from '../../../Assets/laptop.jpg';

const AboutUs = () => {
  const team = [
    {
      id: 1,
      name: 'Alex Johnson',
      position: 'CEO & Founder',
      bio: 'With over 15 years in the tech industry, Alex founded Raqmi Tech with a mission to provide quality computer products at competitive prices.',
      image: LaptopImage
    },
    {
      id: 2,
      name: 'Sarah Williams',
      position: 'CTO',
      bio: 'Former software engineer at a leading tech company, Sarah oversees all technical aspects of Raqmi Tech, ensuring we stay at the cutting edge.',
      image: LaptopImage
    },
    {
      id: 3,
      name: 'Michael Chen',
      position: 'Head of Customer Experience',
      bio: 'Michaels passion for customer satisfaction drives our commitment to providing exceptional service at every touchpoint.',
      image: LaptopImage
    },
    {
      id: 4,
      name: 'Emily Rodriguez',
      position: 'Marketing Director',
      bio: 'With a background in digital marketing, Emily leads our efforts to connect tech enthusiasts with the products they love.',
      image: LaptopImage
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-indigo-600 text-white">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url(/api/placeholder/1920/600)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">About Raqmi Tech</h1>
            <p className="text-xl mb-6">Your trusted partner in technology since 2024</p>
            <p className="mb-8">
              At Raqmi Tech, we're passionate about technology and committed to providing our customers with the best computing products and solutions. Our journey began with a simple idea: make quality technology accessible to everyone.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
          <p className="text-lg text-gray-700 mb-6">
            Raqmi Tech was founded in 2024 with a clear mission: to simplify technology purchasing decisions and provide exceptional value. What started as a small online store has grown into a trusted e-commerce platform serving thousands of customers daily.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Over the years, we've expanded our product range to cover everything from high-performance laptops and custom-built PCs to cutting-edge peripherals and accessories. Our team of tech enthusiasts is constantly researching and testing the latest products to ensure we offer only the best to our customers.
          </p>
          <p className="text-lg text-gray-700">
            Today, Raqmi Tech stands as a beacon for quality, reliability, and exceptional customer service in the technology retail space. While we've grown considerably, our core values remain unchanged – we're still committed to making technology more accessible and enjoyable for everyone.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mb-4">
                <FiUsers size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer First</h3>
              <p className="text-gray-600">
                We prioritize our customers' needs and strive to exceed expectations in every interaction.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mb-4">
                <FiTruck size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality & Reliability</h3>
              <p className="text-gray-600">
                We curate only the highest quality products that meet our strict standards for performance and durability.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mb-4">
                <FiThumbsUp size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
              <p className="text-gray-600">
                Our knowledgeable team provides personalized advice to help you make informed technology decisions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mb-4">
                <FiAward size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Continuous Innovation</h3>
              <p className="text-gray-600">
                We constantly evolve our offerings and services to stay ahead of the rapidly changing tech landscape.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map(member => (
            <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-2 duration-300">
              <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-indigo-600 mb-3">{member.position}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-yellow-400 flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <FiAward key={i} className="fill-current" size={20} />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "Raqmi Tech has been my go-to store for all my computing needs. Their expert advice helped me build my dream gaming PC, and their after-sales support is unmatched!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">David Wilson</h4>
                  <p className="text-sm text-gray-500">Loyal customer since 2015</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-yellow-400 flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <FiAward key={i} className="fill-current" size={20} />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "As a small business owner, I appreciate Raqmi Tech's business solutions. They provided exactly what we needed within our budget, with excellent ongoing support."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Jennifer Lopez</h4>
                  <p className="text-sm text-gray-500">Café Owner</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-yellow-400 flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <FiAward key={i} className="fill-current" size={20} />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "The laptop I purchased from Raqmi Tech three years ago is still running perfectly. Their commitment to quality products and exceptional service keeps me coming back."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Robert Thompson</h4>
                  <p className="text-sm text-gray-500">Software Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience the Raqmi Tech Difference?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied customers who trust us for their technology needs.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="/products" className="bg-white text-indigo-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
              Browse Products
            </a>
            <a href="/contact" className="border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-indigo-600 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;