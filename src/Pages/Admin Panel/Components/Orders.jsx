import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');

  // Simulated API call
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Simulated delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simulated API response
        const mockOrders = [
          { id: 1, customer: 'John Doe', status: 'Pending', total: 599.99, date: '2024-01-15' },
          { id: 2, customer: 'Jane Smith', status: 'In Progress', total: 299.99, date: '2024-02-20' },
          { id: 3, customer: 'Bob Johnson', status: 'Delivered', total: 199.99, date: '2024-03-10' },
          { id: 4, customer: 'Alice Brown', status: 'Pending', total: 399.99, date: '2024-03-25' },
        ];

        setOrders(mockOrders);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Status colors
  const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    Delivered: 'bg-green-100 text-green-800',
  };

  // Filter and sort orders
  // Filter and sort orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus ? order.status === selectedStatus : true;

    return matchesSearch && matchesStatus;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const modifier = sortOrder === 'asc' ? 1 : -1;
    return a[sortBy] > b[sortBy] ? 1 * modifier : -1 * modifier;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-6"
    >
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-white">Order Management</h2>
            <p className="text-gray-300 mt-1">Manage and track customer orders</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search orders..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-auto flex items-center gap-2">
              <div className="relative">
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-lg"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="">Status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>

          {/* Loading State */}
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sortedOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">#{order.id}</td>
                      <td className="px-6 py-4 text-gray-600">{order.customer}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-sm ${statusColors[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">${order.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {sortedOrders.length === 0 && !loading && (
                <div className="text-center py-8 text-gray-500">
                  No orders found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};