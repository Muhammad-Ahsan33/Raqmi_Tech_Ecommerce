import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';

export const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('product');
  const [sortOrder, setSortOrder] = useState('asc');
  const [error, setError] = useState(null);

  // Simulated API call
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Simulated delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simulated API response
        const mockReviews = [
          { id: 1, product: 'MacBook Pro 16"', rating: 4, comment: 'Great product, but a bit expensive.', date: '2024-01-15' },
          { id: 2, product: 'Dell XPS 13', rating: 5, comment: 'Amazing performance and build quality!', date: '2024-02-20' },
          { id: 3, product: 'ASUS ROG Gaming Desktop', rating: 3, comment: 'Good for gaming, but noisy fans.', date: '2024-03-10' },
          { id: 4, product: 'Logitech MX Master 3', rating: 5, comment: 'Best mouse I have ever used!', date: '2024-03-25' },
        ];

        setReviews(mockReviews);
        setLoading(false);
      } catch (err) {
        setError('Failed to load reviews');
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const filteredReviews = reviews.filter(review =>
    review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.comment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    const modifier = sortOrder === 'asc' ? 1 : -1;
    return a[sortBy] > b[sortBy] ? 1 * modifier : -1 * modifier;
  });

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 text-red-600"
      >
        {error}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-6 relative"
    >
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="bg-indigo-600 p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-white">Product Reviews</h2>
            <p className="text-gray-300 mt-1">Manage and view customer feedback</p>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search reviews..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div className="animate-pulse space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-100 rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                      onClick={() => handleSort('product')}
                    >
                      Product {sortBy === 'product' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                      onClick={() => handleSort('rating')}
                    >
                      Rating {sortBy === 'rating' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Comment
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sortedReviews.map((review) => (
                    <tr key={review.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {review.product}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-xl ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{review.comment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {sortedReviews.length === 0 && !loading && (
                <div className="text-center py-8 text-gray-500">
                  No reviews found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};