import { LineChart, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Line, Bar, Area, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiDollarSign, FiShoppingBag, FiUsers, FiTrendingUp, FiBox } from 'react-icons/fi';
import { Skeleton } from '@mui/material';

const generateMockData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    month,
    sales: Math.floor(Math.random() * 5000) + 1000,
    revenue: Math.floor(Math.random() * 100000) + 50000,
    visitors: Math.floor(Math.random() * 10000) + 2000,
  }));

};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
        <p className="font-semibold text-gray-700 mb-2">{label}</p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center text-sm">
              <span
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              ></span>
              <span className="font-medium">{entry.name}:</span>
              <span className="ml-2">${entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const StatCard = ({ icon, title, value, trend, loading }) => {
  const trendColor = trend?.startsWith('↑') ? 'text-green-500' : 'text-red-500';

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-4">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
            {icon}
          </div>
          <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
          {loading ? (
            <Skeleton variant="text" width={120} height={40} />
          ) : (
            <p className="text-2xl font-bold">{value}</p>
          )}
        </div>
        {trend && (
          <div className={`flex items-center ${trendColor}`}>
            <FiTrendingUp className="mr-1" />
            <span className="text-sm">{trend}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch('/api/dashboard');
        // const result = await response.json();

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        const result = {
          stats: {
            revenue: { value: 45231, trend: '↑ 2.5%' },
            orders: { value: 2345, trend: '↑ 5.2%' },
            customers: { value: 8456, trend: '↓ 1.3%' },
            avgOrder: { value: 195, trend: '↑ 0.8%' }
          },
          chartData: generateMockData()
        };

        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) return <div className="text-red-500 p-6">Error: {error}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FiDollarSign className="text-indigo-600 text-xl" />}
          title="Total Revenue"
          value={`$${data.stats?.revenue.value?.toLocaleString() || '0'}`}
          trend={data.stats?.revenue.trend}
          loading={loading}
        />
        <StatCard
          icon={<FiShoppingBag className="text-green-600 text-xl" />}
          title="Total Orders"
          value={data.stats?.orders.value?.toLocaleString() || '0'}
          trend={data.stats?.orders.trend}
          loading={loading}
        />
        <StatCard
          icon={<FiUsers className="text-blue-600 text-xl" />}
          title="Customers"
          value={data.stats?.customers.value?.toLocaleString() || '0'}
          trend={data.stats?.customers.trend}
          loading={loading}
        />
        <StatCard
          icon={<FiTrendingUp className="text-purple-600 text-xl" />}
          title="Avg. Order"
          value={`$${data.stats?.avgOrder.value?.toLocaleString() || '0'}`}
          trend={data.stats?.avgOrder.trend}
          loading={loading}
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-6">Sales Analytics</h3>
        <div className="h-96">
          {loading ? (
            <Skeleton variant="rectangular" height={384} />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.chartData}>
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tick={{ fill: '#6B7280' }}
                />
                <YAxis
                  axisLine={false}
                  tickFormatter={(value) => `$${value / 1000}k`}
                  tick={{ fill: '#6B7280' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4F46E5"
                  strokeWidth={2}
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  fill="url(#salesGradient)"
                  strokeWidth={0}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Order Sources</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tick={{ fill: '#6B7280' }}
                />
                <YAxis
                  axisLine={false}
                  tick={{ fill: '#6B7280' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="visitors"
                  fill="#4F46E5"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold mb-6">Monthly Sales Progress</h3>
          <div className="h-80 relative">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.chartData}>
                  <defs>
                    <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0.5} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tick={{ fill: '#6B7280' }}
                  />
                  <YAxis
                    axisLine={false}
                    tickFormatter={(value) => `$${value / 1000}k`}
                    tick={{ fill: '#6B7280' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="sales"
                    fill="url(#progressGradient)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#4F46E5"
                    strokeWidth={2}
                    dot={false}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
            <div className="absolute top-4 right-4 bg-indigo-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
                <span className="text-sm text-gray-600">Monthly Sales</span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-3 h-3 bg-indigo-300 rounded-full"></div>
                <span className="text-sm text-gray-600">Revenue Trend</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};