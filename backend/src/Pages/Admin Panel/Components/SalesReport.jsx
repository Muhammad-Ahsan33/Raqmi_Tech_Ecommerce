import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const salesData = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 5000 },
  // Add more data
];

export const SalesReport = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6"
    >
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-6">Sales Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-6">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="text-gray-600 text-sm">Best Selling Product</h3>
              <p className="text-xl font-bold mt-2">Premium Laptop</p>
              <p className="text-gray-500 text-sm">Total Sales: $45,231</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-gray-600 text-sm">Total Orders</h3>
              <p className="text-xl font-bold mt-2">1,234</p>
              <span className="text-green-500 text-sm">↑ 12% from last month</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};