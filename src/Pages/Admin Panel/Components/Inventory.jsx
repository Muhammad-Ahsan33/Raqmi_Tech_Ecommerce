import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  FiMonitor, FiCpu, FiHardDrive, FiMousePointer, FiKey, FiSmartphone, FiHeadphones, 
  FiAlertTriangle, FiTrendingUp, FiSearch, FiFilter
} from 'react-icons/fi';

export const Inventory = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // State for dynamic data
  const [inventoryStats, setInventoryStats] = useState({
    totalProducts: 0,
    inStock: 0,
    lowStock: 0,
    outOfStock: 0,
    recentlyAdded: 0,
    onOrder: 0,
    totalValue: 0
  });

  const [categories, setCategories] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);

  // Dummy data for Low Stock
  const lowStockDummyData = [
    { id: 1, name: 'MacBook Pro 16"', sku: 'MBPR16-512-SG', category: 'laptops', inStock: 3, threshold: 5, supplier: 'Apple Inc.' },
    { id: 2, name: 'Dell XPS 13', sku: 'DXPS13-256', category: 'laptops', inStock: 4, threshold: 5, supplier: 'Dell Inc.' },
    { id: 3, name: 'Corsair 16GB RAM', sku: 'CR16GB-3200', category: 'components', inStock: 2, threshold: 5, supplier: 'Corsair' },
    { id: 4, name: 'Logitech Mouse', sku: 'LOGIM-1234', category: 'peripherals', inStock: 1, threshold: 5, supplier: 'Logitech' },
    { id: 5, name: 'Sony Headphones', sku: 'SNYH-9000', category: 'audio', inStock: 3, threshold: 5, supplier: 'Sony' }
  ];

  // Simulate data fetching
  useEffect(() => {
    const fetchData = async () => {
      // Simulated API call
      setTimeout(() => {
        // These would come from API in real app
        setInventoryStats({
          totalProducts: 1234,
          inStock: 1024,
          lowStock: 56,
          outOfStock: 154,
          recentlyAdded: 87,
          onOrder: 129,
          totalValue: 875650.75
        });

        setCategories([
          { id: 'laptops', name: 'Laptops', icon: <FiMonitor className="w-5 h-5 text-indigo-600" />, count: 214, value: 345200.50 },
          { id: 'desktops', name: 'Desktops', icon: <FiCpu className="w-5 h-5 text-indigo-600" />, count: 127, value: 298750.25 },
          { id: 'components', name: 'Components', icon: <FiHardDrive className="w-5 h-5 text-indigo-600" />, count: 352, value: 112400.00 },
          { id: 'peripherals', name: 'Peripherals', icon: <FiMousePointer className="w-5 h-5 text-indigo-600" />, count: 276, value: 56300.00 },
          { id: 'accessories', name: 'Accessories', icon: <FiKey className="w-5 h-5 text-indigo-600" />, count: 183, value: 27500.00 },
          { id: 'mobile', name: 'Mobile Devices', icon: <FiSmartphone className="w-5 h-5 text-indigo-600" />, count: 62, value: 35500.00 },
          { id: 'audio', name: 'Audio', icon: <FiHeadphones className="w-5 h-5 text-indigo-600" />, count: 20, value: 10000.00 }
        ]);

        setInventoryItems([
          { id: 1, name: 'MacBook Pro 16"', sku: 'MBPR16-512-SG', category: 'laptops', inStock: 23, onOrder: 15, price: 2399.99, threshold: 10, supplier: 'Apple Inc.' },
          // ... other items
        ]);

        setLoading(false);
      }, 1500);
    };

    fetchData();
  }, []);

  // Derived state for low stock items
  const lowStockItems = lowStockDummyData;

  // Filter and sort items
  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    const modifier = sortOrder === 'asc' ? 1 : -1;
    return a[sortBy] > b[sortBy] ? 1 * modifier : -1 * modifier;
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-6"
    >

    <div className="rounded-xl overflow-hidden shadow-md pb-3">
        {/* Header */}
      <div className="bg-indigo-600 p-6 border-b">
        <h1 className="text-2xl font-bold text-white">Inventory Management
        </h1>
        <p className="text-gray-300 mt-1">Manage your inventory efficiently</p>
      </div>


      {/* Tabs */}
      <div className="mb-6 mt-3 pl-3 pr-3 border-b border-gray-200">
        <nav className="flex space-x-4 overflow-x-auto pb-1">
          <button
            className={`pb-2 px-1 text-sm font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`pb-2 px-1 text-sm font-medium ${activeTab === 'inventory' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('inventory')}
          >
            All Items
          </button>
          <button
            className={`pb-2 px-1 text-sm font-medium ${activeTab === 'lowstock' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('lowstock')}
          >
            Low Stock
            <span className="ml-1 px-2 py-0.5 text-xs bg-red-100 text-red-800 rounded-full">{lowStockItems.length}</span>
          </button>
        </nav>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {activeTab === 'overview' && (
            <div className="space-y-6 pl-3 pr-3">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-gray-500 text-sm font-medium">Total Products</h3>
                  <p className="text-2xl font-bold mt-2">{inventoryStats.totalProducts.toLocaleString()}</p>
                  <div className="mt-2 text-sm text-green-600 flex items-center">
                    <FiTrendingUp className="w-4 h-4 mr-1" />
                    <span>+{inventoryStats.recentlyAdded} new this month</span>
                  </div>
                </div>
                {/* Other stats cards... */}
              </div>

              {/* Inventory Distribution */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mt-6">
                <h3 className="text-gray-800 text-lg font-medium mb-4">Inventory Distribution</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {categories.map((category) => (
                    <div key={category.id} className="bg-gray-50 p-4 rounded-xl shadow-sm flex items-center justify-between">
                      <div className="flex items-center">
                        {category.icon}
                        <span className="ml-3 text-sm font-medium text-gray-800">{category.name}</span>
                      </div>
                      <div>
                        <span className="block text-xl font-bold text-gray-800">{category.count}</span>
                        <span className="block text-xs text-gray-500">{category.value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              {/* Filters and Table */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by name or SKU..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-auto flex items-center gap-2">
                  <div className="relative">
                    <select
                      className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-lg"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="">All Categories</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>

                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer" onClick={() => handleSort('name')}>
                        Product Name
                        {sortBy === 'name' && (
                          <span className="ml-1">
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </th>
                      {/* Other table headers... */}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedItems.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                        {/* Other table cells... */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'lowstock' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Stock Alerts</h3>
                <button 
                  className="text-blue-600 text-sm hover:text-blue-800"
                  onClick={() => setActiveTab('lowstock')}
                >
                  View all ({lowStockItems.length})
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lowStockItems.map(item => (
                  <div key={item.id} className="flex items-center p-3 bg-red-50 rounded-lg">
                    <div className="bg-red-100 p-2 rounded-lg mr-3">
                      <FiAlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{item.name}</h4>
                      <p className="text-sm text-gray-600">SKU: {item.sku}</p>
                      <p className="text-xs text-gray-500">Supplier: {item.supplier}</p>
                    </div>
                    <span className="text-red-600 font-semibold">{item.inStock} in stock</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
    </motion.div>
  );
};
