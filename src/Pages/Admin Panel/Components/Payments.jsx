import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';

export const Payments = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [error, setError] = useState(null);

  // Simulated API call
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Simulated delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulated API response
        const mockTransactions = [
          { id: 1, date: '2024-01-15', amount: 299.99, status: 'Completed', product: 'MacBook Pro 16"' },
          { id: 2, date: '2024-02-20', amount: 150.0, status: 'Pending', product: 'Dell XPS 13' },
          { id: 3, date: '2024-03-10', amount: 450.0, status: 'Failed', product: 'ASUS ROG Gaming Desktop' },
          { id: 4, date: '2024-03-25', amount: 99.99, status: 'Completed', product: 'Logitech MX Master 3' },
        ];
        
        setTransactions(mockTransactions);
        setLoading(false);
      } catch (err) {
        setError('Failed to load transactions');
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const filteredTransactions = transactions.filter(txn =>
    txn.date.includes(searchTerm) ||
    txn.amount.toString().includes(searchTerm) ||
    txn.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    txn.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
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
      className="p-4 md:p-6"
    >
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="bg-indigo-600 p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-white">Payment Transactions</h2>
            <p className="text-gray-300 mt-1">View and manage payment history</p>
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
                placeholder="Search transactions..."
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
                      onClick={() => handleSort('date')}
                    >
                      Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Product
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                      onClick={() => handleSort('amount')}
                    >
                      Amount {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                      onClick={() => handleSort('status')}
                    >
                      Status {sortBy === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sortedTransactions.map((txn) => (
                    <tr key={txn.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{txn.date}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {txn.product}
                      </td>
                      <td className="px-6 py-4 font-medium">
                        ${txn.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            txn.status === 'Completed'
                              ? 'bg-green-100 text-green-800'
                              : txn.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {txn.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {sortedTransactions.length === 0 && !loading && (
                <div className="text-center py-8 text-gray-500">
                  No transactions found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};