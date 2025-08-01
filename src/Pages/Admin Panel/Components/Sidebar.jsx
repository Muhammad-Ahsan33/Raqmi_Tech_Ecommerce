import { NavLink, useLocation } from 'react-router-dom';
import {
  FiHome, FiPlusSquare, FiTrash2, FiPackage, FiUsers, FiShoppingBag,
  FiDollarSign, FiStar, FiTruck, FiBarChart, FiMenu, FiX,
  FiChevronDown, FiChevronRight
} from 'react-icons/fi';
import { memo, useState, useEffect, useRef } from 'react';

export const Sidebar = memo(({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isProductsActive = [
    '/admin/add-product',
    '/admin/delete-products'
  ].includes(location.pathname);

  useEffect(() => {
    if (isCollapsed) {
      setIsProductsOpen(false);
    }
  }, [isCollapsed]);

  useEffect(() => {
    if (isProductsActive && !isCollapsed) {
      setIsProductsOpen(true);
    }
  }, [location.pathname, isProductsActive, isCollapsed]);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (isCollapsed && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProductsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCollapsed]);

  // Handle navigation in collapsed mode
  const handleSubItemClick = () => {
    if (isCollapsed) {
      setIsProductsOpen(false);
    }
  };

  const menuItems = [
    { name: 'Dashboard', icon: <FiHome className="text-xl" />, path: '/admin' },
    // Products moved to a separate dropdown component
    { name: 'Inventory', icon: <FiPackage className="text-xl" />, path: '/admin/inventory' },
    { name: 'Add Category', icon: <FiPlusSquare className="text-xl" />, path: '/admin/add-category' },
    { name: 'Users', icon: <FiUsers className="text-xl" />, path: '/admin/users' },
    { name: 'Payments', icon: <FiDollarSign className="text-xl" />, path: '/admin/payments' },
    { name: 'Reviews', icon: <FiStar className="text-xl" />, path: '/admin/reviews' },
    { name: 'Orders', icon: <FiTruck className="text-xl" />, path: '/admin/orders' },
    { name: 'Sales Report', icon: <FiBarChart className="text-xl" />, path: '/admin/sales' },
  ];

  const productSubItems = [
    { name: 'Add Product', icon: <FiPlusSquare className="text-xl" />, path: '/admin/add-product' },
    { name: 'Delete Products', icon: <FiTrash2 className="text-xl" />, path: '/admin/delete-products' },
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
      className={`fixed h-screen bg-white shadow-lg transition-all duration-300 z-20 ${isCollapsed ? 'w-20' : 'w-64'
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
        {/* Dashboard (First Item) */}
        <NavLink
          to="/admin"
          end
          className={({ isActive }) => `
            flex items-center px-4 py-3 rounded-lg transition-colors duration-200
            ${isActive ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}
          `}
          title={isCollapsed ? 'Dashboard' : ''}
        >
          <FiHome className="text-xl" />
          {!isCollapsed && <span className="ml-3 font-medium">Dashboard</span>}
        </NavLink>

        {/* Products Dropdown (Second Item) */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsProductsOpen(!isProductsOpen)}
            className={`
              w-full flex items-center px-4 py-3 rounded-lg transition-colors duration-200
              ${isProductsActive ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}
            `}
            title={isCollapsed ? 'Products' : ''}
          >
            <FiShoppingBag className="text-xl" />
            {!isCollapsed && (
              <>
                <span className="ml-3 font-medium">Products</span>
                <span className="ml-auto">
                  {isProductsOpen ? <FiChevronDown /> : <FiChevronRight />}
                </span>
              </>
            )}
          </button>

          {/* Products Submenu */}
          {isProductsOpen && (
            <div
              className={`
                mt-1 transition-all duration-300 overflow-hidden
                ${isCollapsed ? 'absolute left-full top-0 ml-2 w-48 bg-white shadow-lg rounded-md' : 'pl-6'}
              `}
            >
              {productSubItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={handleSubItemClick}
                  className={({ isActive }) => `
                    flex items-center px-4 py-3 rounded-lg transition-colors duration-200
                    ${isActive ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}
                  `}
                >
                  {item.icon}
                  <span className="ml-3 font-medium">{item.name}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Other Menu Items */}
        {menuItems.map((item) => (
          item.name !== 'Dashboard' && (
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
          )
        ))}
      </nav>
    </div>
  );
});