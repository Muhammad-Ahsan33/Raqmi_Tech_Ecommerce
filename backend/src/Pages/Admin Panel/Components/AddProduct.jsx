import { motion } from 'framer-motion';

export const AddProduct = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6"
    >
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            {/* Add more form fields */}
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Image</label>
              <div className="mt-1 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md">
                <span className="text-gray-500">Upload image</span>
              </div>
            </div>
          </div>
          <button className="md:col-span-2 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition">
            Add Product
          </button>
        </form>
      </div>
    </motion.div>
  );
};