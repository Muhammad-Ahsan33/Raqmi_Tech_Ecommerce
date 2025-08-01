import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from './Components/Sidebar';
import { motion } from 'framer-motion';
import { Dashboard } from './Components/Dashboard';
import { AddProduct } from './Components/AddProduct';
import { DeleteProducts } from './Components/DeleteProducts';
import { Inventory } from './Components/Inventory';
import { AddCategory } from './Components/AddCategory';
import { Users } from './Components/Users';
import { Payments } from './Components/Payments';
import { Reviews } from './Components/Reviews';
import { Orders } from './Components/Orders';
import { SalesReport } from './Components/SalesReport';

export const AdminPanel = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      
      <main
        className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-14 pr-4' : 'ml-64 pr-10'
        } overflow-y-auto h-screen`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-8xl mx-auto p-6 sm:max-w-7xl md:max-w-8xl lg:max-w-8xl"
        >
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="delete-products" element={<DeleteProducts />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="add-category" element={<AddCategory />} />
            <Route path="users" element={<Users />} />
            <Route path="payments" element={<Payments />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="orders" element={<Orders />} />
            <Route path="sales" element={<SalesReport />} />
          </Routes>
        </motion.div>
      </main>
    </div>
  );
};
