import { motion } from 'framer-motion';
import {  FiSave } from 'react-icons/fi';

export const AddCategory = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-6"
    >
      <div className="rounded-xl overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 p-6 border-b">
          <h1 className="text-2xl font-bold text-white">Add New Category</h1>
          <p className="text-gray-300 mt-1">Create and manage product categories</p>
        </div>

        {/* Form Section */}
        <div className="bg-white p-6">
          <form className="max-w-2xl mx-auto">
            <div className="space-y-6">
              {/* Category Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  placeholder="Enter category name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg transition"
                />
                <p className="mt-1 text-sm text-gray-500">
                  This will be used to organize your products
                </p>
              </div>

              {/* Category Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter a brief description of the category"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg transition"
                />
                <p className="mt-1 text-sm text-gray-500">
                  This will help others understand the purpose of this category
                </p>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3">
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition flex items-center"
                >
                  <FiSave className="w-4 h-4 mr-2" />
                  Save Category
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};