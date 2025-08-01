import { motion } from 'framer-motion';

export const Inventory = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6"
    >
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-6">Inventory Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Inventory Cards */}
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="text-gray-600 text-sm">Total Products</h3>
            <p className="text-2xl font-bold mt-2">1,234</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-gray-600 text-sm">In Stock</h3>
            <p className="text-2xl font-bold mt-2">1,024</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="text-gray-600 text-sm">Low Stock</h3>
            <p className="text-2xl font-bold mt-2">56</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};