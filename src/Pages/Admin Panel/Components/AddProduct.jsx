import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiUpload, FiDollarSign, FiShoppingBag, FiTag, FiInfo, FiBox, FiCheck, FiImage, FiPlus, FiX } from 'react-icons/fi';

export const AddProduct = () => {
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [specifications, setSpecifications] = useState([{ key: '', value: '' }]);
  const [activeTab, setActiveTab] = useState('basic');

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      
      // Create preview URLs
      const newPreviewUrls = filesArray.map(file => URL.createObjectURL(file));
      
      setImages([...images, ...filesArray]);
      setPreviewUrls([...previewUrls, ...newPreviewUrls]);
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    const newPreviewUrls = [...previewUrls];
    
    // Revoke the URL to avoid memory leaks
    URL.revokeObjectURL(previewUrls[index]);
    
    newImages.splice(index, 1);
    newPreviewUrls.splice(index, 1);
    
    setImages(newImages);
    setPreviewUrls(newPreviewUrls);
  };

  const addSpecification = () => {
    setSpecifications([...specifications, { key: '', value: '' }]);
  };

  const updateSpecification = (index, field, value) => {
    const updatedSpecs = [...specifications];
    updatedSpecs[index][field] = value;
    setSpecifications(updatedSpecs);
  };

  const removeSpecification = (index) => {
    const updatedSpecs = [...specifications];
    updatedSpecs.splice(index, 1);
    setSpecifications(updatedSpecs);
  };

  const computerCategories = [
    { id: 'laptops', name: 'Laptops' },
    { id: 'desktops', name: 'Desktop Computers' },
    { id: 'components', name: 'Computer Components' },
    { id: 'monitors', name: 'Monitors & Displays' },
    { id: 'peripherals', name: 'Peripherals' },
    { id: 'networking', name: 'Networking' },
    { id: 'storage', name: 'Storage Devices' },
    { id: 'software', name: 'Software' },
    { id: 'gaming', name: 'Gaming Accessories' },
    { id: 'accessories', name: 'Computer Accessories' }
  ];

  const subCategories = {
    laptops: ['Gaming Laptops', 'Business Laptops', 'Ultrabooks', 'Convertible/2-in-1', 'MacBooks', 'Chromebooks'],
    desktops: ['Gaming PCs', 'Workstations', 'All-in-One PCs', 'Mini PCs', 'Desktop Towers'],
    components: ['CPUs', 'Motherboards', 'Graphics Cards', 'RAM', 'Power Supplies', 'Cooling Systems', 'Computer Cases'],
    monitors: ['Gaming Monitors', 'Ultrawide Monitors', '4K Monitors', 'Professional Displays', 'Curved Monitors'],
    peripherals: ['Keyboards', 'Mice', 'Webcams', 'Headsets', 'Speakers', 'Microphones', 'Printers', 'Scanners'],
    networking: ['Routers', 'Network Switches', 'Modems', 'WiFi Extenders', 'Network Adapters', 'Ethernet Cables'],
    storage: ['SSDs', 'HDDs', 'External Drives', 'USB Flash Drives', 'NAS', 'Memory Cards'],
    software: ['Operating Systems', 'Productivity Software', 'Security Software', 'Design Software', 'Development Tools'],
    gaming: ['Controllers', 'VR Headsets', 'Gaming Chairs', 'RGB Lighting', 'Gaming Desks'],
    accessories: ['Laptop Bags', 'Mouse Pads', 'USB Hubs', 'Cleaning Supplies', 'Cable Management', 'Adapters']
  };

  const brands = [
    'Apple', 'Dell', 'HP', 'Lenovo', 'ASUS', 'Acer', 'Samsung', 'Microsoft', 'MSI', 'Alienware',
    'Intel', 'AMD', 'NVIDIA', 'Corsair', 'Logitech', 'Razer', 'SteelSeries', 'Western Digital', 'Seagate', 'Kingston'
  ];

  const [selectedCategory, setSelectedCategory] = useState('');

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: <FiInfo /> },
    { id: 'category', label: 'Category', icon: <FiTag /> },
    { id: 'pricing', label: 'Pricing', icon: <FiDollarSign /> },
    { id: 'details', label: 'Details', icon: <FiBox /> },
    { id: 'images', label: 'Images', icon: <FiImage /> },
    { id: 'status', label: 'Status', icon: <FiCheck /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-6"
    >
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 px-6 py-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center">
            <FiShoppingBag className="mr-2" /> Add New Product
          </h2>
        </div>
        
        {/* Tabs for mobile */}
        <div className="px-4 sm:px-6 pt-4 sm:hidden overflow-x-auto">
          <div className="flex space-x-2 border-b">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 px-2 flex items-center text-sm ${
                  activeTab === tab.id 
                    ? 'border-b-2 border-indigo-600 text-indigo-600 font-medium' 
                    : 'text-gray-500'
                }`}
              >
                {tab.icon}
                <span className="ml-1">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        <form className="p-4 sm:p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Column */}
            <div className="w-full md:w-3/4 space-y-6">
              {/* Basic Information - Always visible on desktop, conditionally on mobile */}
              <div className={`transition-all duration-300 ${activeTab === 'basic' || window.innerWidth >= 640 ? 'block' : 'hidden sm:block'}`}>
                <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-indigo-50 px-4 py-3 border-b border-gray-100">
                    <h3 className="text-lg font-medium text-indigo-800 flex items-center">
                      <FiInfo className="mr-2" /> Basic Information
                    </h3>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Dell XPS 15 Laptop"
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                        <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                          <option value="">Select Brand</option>
                          {brands.map(brand => (
                            <option key={brand} value={brand}>{brand}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                        <input
                          type="text"
                          placeholder="e.g. XPS15-9500-i7"
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Model Number</label>
                        <input
                          type="text"
                          placeholder="e.g. 9500-2020"
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Category Selection */}
              <div className={`transition-all duration-300 ${activeTab === 'category' || window.innerWidth >= 640 ? 'block' : 'hidden sm:block'}`}>
                <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-indigo-50 px-4 py-3 border-b border-gray-100">
                    <h3 className="text-lg font-medium text-indigo-800 flex items-center">
                      <FiTag className="mr-2" /> Category
                    </h3>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Main Category</label>
                        <select 
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                          <option value="">Select Category</option>
                          {computerCategories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sub-Category</label>
                        <select 
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          disabled={!selectedCategory}
                        >
                          <option value="">Select Sub-Category</option>
                          {selectedCategory && subCategories[selectedCategory]?.map(subCategory => (
                            <option key={subCategory} value={subCategory}>{subCategory}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Pricing and Inventory */}
              <div className={`transition-all duration-300 ${activeTab === 'pricing' || window.innerWidth >= 640 ? 'block' : 'hidden sm:block'}`}>
                <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-indigo-50 px-4 py-3 border-b border-gray-100">
                    <h3 className="text-lg font-medium text-indigo-800 flex items-center">
                      <FiDollarSign className="mr-2" /> Pricing & Inventory
                    </h3>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Regular Price</label>
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="number"
                            placeholder="0.00"
                            className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price</label>
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="number"
                            placeholder="0.00"
                            className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Quantity in Stock</label>
                        <input
                          type="number"
                          placeholder="0"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                        <input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tax Status</label>
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center">
                            <input
                              id="taxable"
                              name="taxStatus"
                              type="radio"
                              defaultChecked
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor="taxable" className="ml-2 block text-sm text-gray-700">
                              Taxable
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="nonTaxable"
                              name="taxStatus"
                              type="radio"
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor="nonTaxable" className="ml-2 block text-sm text-gray-700">
                              Non-taxable
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Product Details */}
              <div className={`transition-all duration-300 ${activeTab === 'details' || window.innerWidth >= 640 ? 'block' : 'hidden sm:block'}`}>
                <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-indigo-50 px-4 py-3 border-b border-gray-100">
                    <h3 className="text-lg font-medium text-indigo-800 flex items-center">
                      <FiBox className="mr-2" /> Product Details
                    </h3>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                        <textarea
                          rows="2"
                          placeholder="Brief product highlights"
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        ></textarea>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
                        <textarea
                          rows="4"
                          placeholder="Detailed product description"
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        ></textarea>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="block text-sm font-medium text-gray-700">Specifications</label>
                          <button
                            type="button"
                            onClick={addSpecification}
                            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
                          >
                            <FiPlus className="mr-1" /> Add Spec
                          </button>
                        </div>
                        
                        {specifications.map((spec, index) => (
                          <div key={index} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-2 bg-gray-50 p-2 rounded-md">
                            <input
                              type="text"
                              placeholder="Spec name (e.g., Processor)"
                              value={spec.key}
                              onChange={(e) => updateSpecification(index, 'key', e.target.value)}
                              className="block w-full sm:w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            <div className="flex w-full sm:w-1/2">
                              <input
                                type="text"
                                placeholder="Value (e.g., Intel Core i7-10750H)"
                                value={spec.value}
                                onChange={(e) => updateSpecification(index, 'value', e.target.value)}
                                className="block flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              />
                              {specifications.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeSpecification(index)}
                                  className="ml-2 text-red-500 hover:text-red-700"
                                >
                                  <FiX />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Product Images */}
              <div className={`transition-all duration-300 ${activeTab === 'images' || window.innerWidth >= 640 ? 'block' : 'hidden sm:block'}`}>
                <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-indigo-50 px-4 py-3 border-b border-gray-100">
                    <h3 className="text-lg font-medium text-indigo-800 flex items-center">
                      <FiImage className="mr-2" /> Product Images
                    </h3>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-indigo-200 rounded-md bg-indigo-50/50">
                      <div className="space-y-1 text-center">
                        <FiUpload className="mx-auto h-12 w-12 text-indigo-400" />
                        <div className="flex text-sm text-gray-600">
                          <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 px-3 py-2">
                            <span>Upload files</span>
                            <input 
                              id="file-upload" 
                              name="file-upload" 
                              type="file" 
                              multiple
                              accept="image/*"
                              className="sr-only" 
                              onChange={handleImageChange}
                            />
                          </label>
                          <p className="pl-1 pt-2">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                    
                    {previewUrls.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                        {previewUrls.map((url, index) => (
                          <div key={index} className="relative group">
                            <img 
                              src={url} 
                              alt={`Preview ${index}`} 
                              className="h-24 w-full object-cover rounded-md shadow-sm border border-gray-200" 
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <FiX size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Status */}
              <div className={`transition-all duration-300 ${activeTab === 'status' || window.innerWidth >= 640 ? 'block' : 'hidden sm:block'}`}>
                <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-indigo-50 px-4 py-3 border-b border-gray-100">
                    <h3 className="text-lg font-medium text-indigo-800 flex items-center">
                      <FiCheck className="mr-2" /> Product Status
                    </h3>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Visibility</label>
                        <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                          <option value="published">Published</option>
                          <option value="draft">Draft</option>
                          <option value="private">Private</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Featured Product</label>
                        <div className="mt-2">
                          <label className="inline-flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                            <span className="ml-2">Mark as featured product</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Quick Actions (hidden on mobile) */}
            <div className="hidden md:block w-full md:w-1/4">
              <div className="bg-white border border-gray-100 rounded-lg shadow-sm sticky top-6">
                <div className="bg-indigo-50 px-4 py-3 border-b border-gray-100">
                  <h3 className="text-lg font-medium text-indigo-800">Actions</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <button 
                      type="submit" 
                      className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition text-sm font-medium shadow-sm flex justify-center items-center"
                    >
                      <FiCheck className="mr-2" /> Publish Product
                    </button>
                    
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-600 mb-2">Quick Tips:</p>
                      <ul className="text-xs text-gray-500 space-y-1">
                        <li>• Add high-quality images for better visibility</li>
                        <li>• Complete all specifications for better search results</li>
                        <li>• Set competitive pricing compared to market rates</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Submit Buttons (Mobile Only) */}
          <div className="flex justify-between mt-6 space-x-3 md:hidden">
            
            <button 
              type="submit" 
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition text-sm font-medium shadow-sm"
            >
              Publish Product
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};