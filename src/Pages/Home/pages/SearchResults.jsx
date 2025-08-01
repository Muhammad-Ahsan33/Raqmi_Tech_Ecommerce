import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Components/Navbar'; 
import Footer from '../Components/Footer'; 
import ProductCard from '../Components/Sections/Common/ProductCard'; 

const SearchResults = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Extract search query from URL
  useEffect(() => {
    const query = new URLSearchParams(location.search).get('q');
    if (query) {
      setSearchQuery(query);
      fetchSearchResults(query); // Fetch results based on the query
    }
  }, [location.search]);

  // Simulate fetching search results (replace with real API call)
  const fetchSearchResults = async (query) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Replace this with your actual API call
      const mockData = [
        {
          id: 1,
          name: 'Laptop Pro X1',
          price: 1299.99,
          image: 'https://via.placeholder.com/300',
          rating: 4.5,
          reviews: 120,
        },
        {
          id: 2,
          name: 'Gaming Desktop Ultra',
          price: 1999.99,
          image: 'https://via.placeholder.com/300',
          rating: 4.8,
          reviews: 95,
        },
        {
          id: 3,
          name: 'Tablet Lite',
          price: 499.99,
          image: 'https://via.placeholder.com/300',
          rating: 4.2,
          reviews: 80,
        },
      ];

      // Filter mock data based on query (replace with real backend logic)
      const filteredResults = mockData.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults(filteredResults);
    } catch (err) {
      setError('Failed to fetch search results. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow bg-gray-50 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Search Results for "{searchQuery}"
            </h1>
            <p className="text-gray-600 mt-5">
              {searchResults.length} results found
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Search Results Grid */}
          {!isLoading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.length > 0 ? (
                searchResults.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-600 text-lg">
                    No products found for your search.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SearchResults;