import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const salesData = [
  { month: 'Jan', sales: 4000, inventory: 6000 },
  { month: 'Feb', sales: 3000, inventory: 5500 },
  { month: 'Mar', sales: 5000, inventory: 4800 },
  { month: 'Apr', sales: 4500, inventory: 4200 },
  { month: 'May', sales: 6000, inventory: 3800 },
  { month: 'Jun', sales: 5500, inventory: 4500 }
];

const inventoryStatusData = [
  { name: 'In Stock', value: 65 },
  { name: 'Low Stock', value: 25 },
  { name: 'Out of Stock', value: 10 }
];

const COLORS = ['#4F46E5', '#F59E0B', '#EF4444'];

export const SalesReport = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-6"
    >
      <div className="rounded-xl overflow-hidden shadow-sm">
        {/* Header */}
        <div className="bg-indigo-600 p-6 border-b">
          <h1 className="text-2xl font-bold text-white">Inventory Analytics</h1>
          <p className="text-gray-300 mt-1">Track sales and inventory performance</p>
        </div>

        {/* Main Content */}
        <div className="bg-white p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sales vs Inventory Chart */}
            <div className="lg:col-span-2">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Sales vs Inventory Trends</h3>
                <div className="h-64 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="sales" stroke="#4F46E5" strokeWidth={2} activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="inventory" stroke="#10B981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Inventory Status */}
            <div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 h-full">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Inventory Status</h3>
                <div className="h-48 md:h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                      <Pie
                        data={inventoryStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={0}
                        outerRadius={60}
                        paddingAngle={5}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {inventoryStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="center"
                        wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="text-gray-600 text-sm">Top Product</h3>
              <p className="text-xl font-bold mt-2">Wireless Headphones</p>
              <p className="text-gray-500 text-sm">Units Sold: 1,234</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-gray-600 text-sm">Inventory Turnover</h3>
              <p className="text-xl font-bold mt-2">4.2x</p>
              <span className="text-green-500 text-sm">↑ 8% from last quarter</span>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg">
              <h3 className="text-gray-600 text-sm">Restock Alert</h3>
              <p className="text-xl font-bold mt-2">12 Products</p>
              <span className="text-amber-500 text-sm">Require attention</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SalesReport;
