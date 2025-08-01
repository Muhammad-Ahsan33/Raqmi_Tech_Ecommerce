import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiTrash, FiAlertCircle, FiXCircle, FiCheck } from 'react-icons/fi';

export const DeleteProducts = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'MacBook Pro 13"', category: 'Laptops', stock: 15, price: 1299.99 },
    { id: 2, name: 'Dell XPS 15', category: 'Laptops', stock: 8, price: 1499.99 },
    { id: 3, name: 'ASUS ROG Gaming Mouse', category: 'Accessories', stock: 34, price: 79.99 },
    { id: 4, name: 'Samsung 4K Monitor 32"', category: 'Monitors', stock: 12, price: 349.99 },
    { id: 5, name: 'Corsair Mechanical Keyboard', category: 'Accessories', stock: 23, price: 129.99 },
    { id: 6, name: 'Nvidia RTX 4080', category: 'Graphics Cards', stock: 5, price: 899.99 },
    { id: 7, name: 'Logitech Wireless Headset', category: 'Audio', stock: 19, price: 149.99 },
    { id: 8, name: 'Intel Core i9 Processor', category: 'Components', stock: 7, price: 549.99 },
  ]);

  const [isDeleting, setIsDeleting] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Get unique categories from products
  const categories = [...new Set(products.map(product => product.category))];

  // Handle open delete confirmation
  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setIsDeleting(true);
  };

  // Handle cancel delete
  const handleCancelDelete = () => {
    setIsDeleting(false);
    setProductToDelete(null);
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    setProducts(products.filter(product => product.id !== productToDelete.id));
    setIsDeleting(false);
    setProductToDelete(null);

    // Show success notification
    setNotification({
      type: 'success',
      message: `${productToDelete.name} has been deleted successfully.`
    });

    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === '' || product.category === categoryFilter)
    );
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-6"
    >
      {/* Notification */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-4 p-4 rounded-lg flex items-center justify-between ${notification.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}
        >
          <div className="flex items-center">
            {notification.type === 'success' ? (
              <FiCheck className="mr-2 h-5 w-5" />
            ) : (
              <FiAlertCircle className="mr-2 h-5 w-5" />
            )}
            <p>{notification.message}</p>
          </div>
          <button onClick={() => setNotification(null)}>
            <FiXCircle className="h-5 w-5" />
          </button>
        </motion.div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b bg-indigo-600">
          <h2 className="text-2xl font-bold text-white">Manage Computer Inventory</h2>
          <p className="text-gray-300 mt-1">Delete products that are no longer available or discontinued.</p>
        </div>

        {/* Filters */}
        <div className="p-4 md:p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search Products</label>
              <input
                type="text"
                id="search"
                placeholder="Search by product name..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-64">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Filter by Category</label>
              <select
                id="category"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Price</th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 md:px-6 py-4 font-medium">{product.name}</td>
                    <td className="px-4 md:px-6 py-4 text-gray-500">{product.category}</td>
                    <td className="px-4 md:px-6 py-4 text-gray-500 hidden md:table-cell">${product.price.toFixed(2)}</td>
                    <td className="px-4 md:px-6 py-4">
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium 
    ${product.stock <= 5 ? 'bg-red-100 text-red-800' :
                          product.stock <= 15 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'} max-w-fit`}>
                        <span>{product.stock}</span>
                        <span className="text-xs text-gray-500"> units</span>
                      </div>
                    </td>



                    <td className="px-4 md:px-6 py-4">
                      <button
                        className="text-red-600 hover:text-red-900 flex items-center gap-1"
                        onClick={() => handleDeleteClick(product)}
                      >
                        <FiTrash className="h-4 w-4" />
                        <span className="inline sm:inline">Delete</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No products match your search criteria. Try adjusting your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom info */}
        <div className="p-4 md:p-6 bg-gray-50 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {isDeleting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg max-w-md w-full p-6"
          >
            <h3 className="text-lg font-bold text-gray-800">Are you Sure?</h3>
            <p className="text-gray-600 mt-2">
              Are you sure you want to delete <span className="font-medium text-gray-900">{productToDelete?.name}</span>?
              This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};