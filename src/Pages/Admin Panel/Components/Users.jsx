import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiTrash, FiSearch } from 'react-icons/fi';

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // Track selected user for deletion
  const [showModal, setShowModal] = useState(false); // Control modal visibility

  // Simulated API call
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Simulated delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulated API response
        const mockUsers = [
          { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', joined: '2024-01-15' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Manager', joined: '2024-02-20' },
          { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', joined: '2024-03-10' },
        ];
        
        setUsers(mockUsers);
        setLoading(false);
      } catch (err) {
        setError('Failed to load users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const modifier = sortOrder === 'asc' ? 1 : -1;
    return a[sortBy] > b[sortBy] ? 1 * modifier : -1 * modifier;
  });

  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const confirmDelete = () => {
    setUsers(users.filter(user => user.id !== selectedUser.id)); // Remove user from list
    setShowModal(false); // Close modal
  };

  const cancelDelete = () => {
    setShowModal(false); // Close modal
  };

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 text-red-600"
      >
        {error}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-6"
    >
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="bg-indigo-600 p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-white">User Management</h2>
            <p className="text-gray-300 mt-1">Manage system users and permissions</p>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search users..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

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
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                      onClick={() => handleSort('name')}
                    >
                      Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Email
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                      onClick={() => handleSort('role')}
                    >
                      Role {sortBy === 'role' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sortedUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{user.name}</td>
                      <td className="px-6 py-4 text-gray-600">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex space-x-4">
                        <button className="text-red-600 hover:text-red-900 flex items-center" onClick={() => handleDelete(user)}>
                          <FiTrash className="mr-1" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {sortedUsers.length === 0 && !loading && (
                <div className="text-center py-8 text-gray-500">
                  No users found
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal for Confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div 
            className="bg-white rounded-lg shadow-xl w-11/12 max-w-md p-6 m-4"
            style={{ position: 'relative', zIndex: 100 }}
          >
            <h3 className="text-lg font-bold text-gray-800">Are you Sure?</h3>
            <p className="text-gray-600 mt-2">
              Do you really want to delete user <span className="font-medium">{selectedUser?.name}</span>?
            </p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={confirmDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};