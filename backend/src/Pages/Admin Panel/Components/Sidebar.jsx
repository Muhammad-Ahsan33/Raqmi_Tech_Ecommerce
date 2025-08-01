import { NavLink, useLocation } from 'react-router-dom';
import {
  FiHome, FiPlusSquare, FiTrash2, FiPackage, FiUsers,
  FiDollarSign, FiStar, FiTruck, FiBarChart, FiMenu, FiX
} from 'react-icons/fi';
import { memo, useState, useEffect } from 'react';

export const Sidebar = memo(({ isCollapsed, setIsCollapsed }) => {
  const menuItems = [
    { name: 'Dashboard', icon: <FiHome className="text-xl" />, path: '/admin' },
    { name: 'Add Product', icon: <FiPlusSquare className="text-xl" />, path: '/admin/add-product' },
    { name: 'Delete Products', icon: <FiTrash2 className="text-xl" />, path: '/admin/delete-products' },
    { name: 'Inventory', icon: <FiPackage className="text-xl" />, path: '/admin/inventory' },
    { name: 'Add Category', icon: <FiPlusSquare className="text-xl" />, path: '/admin/add-category' },
    { name: 'Users', icon: <FiUsers className="text-xl" />, path: '/admin/users' },
    { name: 'Payments', icon: <FiDollarSign className="text-xl" />, path: '/admin/payments' },
    { name: 'Reviews', icon: <FiStar className="text-xl" />, path: '/admin/reviews' },
    { name: 'Orders', icon: <FiTruck className="text-xl" />, path: '/admin/orders' },
    { name: 'Sales Report', icon: <FiBarChart className="text-xl" />, path: '/admin/sales' },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsCollapsed(true); 
      } else {
        setIsCollapsed(false); 
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [setIsCollapsed]);

  return (
    <div
      className={`fixed h-screen bg-white shadow-lg transition-transform duration-500 ${
        isCollapsed ? 'w-20' : 'w-64'
      } will-change-transform`} 
    >
      <div className="flex items-center justify-between p-4 mt-8">
        {!isCollapsed && (
          <div>
            <h2 className="text-2xl font-bold text-indigo-600">Raqmi Tech</h2>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-600 focus:outline-none"
        >
          {isCollapsed ? <FiMenu className="text-2xl ml-3" /> : <FiX className="text-2xl" />}
        </button>
      </div>

      <nav className="px-4 space-y-1 mt-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) => `
              flex items-center px-4 py-3 rounded-lg transition-colors duration-200
              ${isActive ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}
            `}
            title={isCollapsed ? item.name : ''}
          >
            {item.icon}
            {!isCollapsed && <span className="ml-3 font-medium">{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
});