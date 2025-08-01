import Productcontroller from "../models/productModel.js";
import monitorcontroller from "./monitorController.js";
import mousecontroller from "./mouseController.js";
import keyboardcontroller from "./keyboardController.js";
import speakercontroller from "./speakerController.js";
import headphonecontroller from "./headphoneController.js";
import products_to_prompt from "../services/products_to_prompt.js";
import cloudinryservice from "../services/cloudinary-service.js";


const add_product = async(req , res) =>{
  try{
      const product = req.body;
      
      if(!product.name || !product.category || !product.sub_category || !product.discounted_price || !product.actual_price || !product.discount_percentage || !product.rating || !product.rating_count || !product.description || !product.product_link || !product.file){
          res.status(400).json({message : "All data is required"});
      }

      // if(!product.category){
      //     return res.status(400).json({message: "Category not provided"});
      // }
      let newproduct;

      if(product.category == "monitor" || product.category == "Monitor"){
           newproduct = await monitorcontroller.addmonitor(product);

      }
      if(product.category == "keyboard" || product.category == "Keyboard"){
          newproduct = await keyboardcontroller.addkeyboard(product);

      }
      if(product.category == "mouse" || product.category == "Mouse"){
          newproduct = await mousecontroller.addmouse(product);

      }
      if(product.category == "speaker" || product.category == "Speaker"){
          newproduct = await speakercontroller.adddpeaker(product);

      }
      if(product.category == "headphones" || product.category == "Headphones"){
          newproduct = await headphonecontroller.addheadphone(product);

      }

      if(!newproduct || newproduct.error){
          return res.status(400).json({message: "Product addition failed" , error:error.message});
      }

      res.status(200).json({message: "Product added Successfully"});
      products_to_prompt.updateSystemPrompt(product);      
      cloudinryservice.uploadFileOnCloudinary(product.file.path);

  }
  catch(error){
      res.status(500).json({message: "Product addition failed due to Server Issues" , error: error.message})

  }
  
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Productcontroller.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// import Product from "../models/Product.js";

const getFiltersByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    // // Define category-specific filters
    // const categoryFilters = {
    //   Monitor: ["refresh_rate", "size", "resolution"],
    //   Mouse: ["max_dpi", "tracking_method"],
    //   Speaker: ["wattage", "frequency_response"],
    //   Keyboard: ["switch", "connectivity"],
    //   Headphones: ["microphone", "connectivity"],
    // };

    // const filters = categoryFilters[category] || [];
    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const product = await Productcontroller.find({category});
    if (product.length === 0) {
      return res.status(404).json({ message: "No products found for this category" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// const filterProducts = async (req, res) => {
//   try {
//     const { category, minPrice, maxPrice, minRating, maxRating, ...dynamicFilters } = req.query;

//     let filter = {};
//     if (category) filter.category = category;
//     if (minPrice || maxPrice) {
//       filter.discounted_price = {};
//       if (minPrice) filter.discounted_price.$gte = parseFloat(minPrice);
//       if (maxPrice) filter.discounted_price.$lte = parseFloat(maxPrice);
//     }
//     if (minRating || maxRating) {
//       filter.rating = {};
//       if (minRating) filter.rating.$gte = parseFloat(minRating);
//       if (maxRating) filter.rating.$lte = parseFloat(maxRating);
//     }

//     // Add category-specific filters dynamically
//     Object.keys(dynamicFilters).forEach((key) => {
//       if (dynamicFilters[key]) {
//         filter[key] = dynamicFilters[key];
//       }
//     });

//     const products = await Productcontroller.find(filter);
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };



const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Productcontroller.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Fetch all products in the same category to show subcategories
    const subCategories = await Productcontroller.find({ category: product.category }).distinct("sub_category");

    res.status(200).json({ product, subCategories });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// const filterProducts = async (req, res) => {
//   try {
//     const { category, minPrice, maxPrice, minRating, maxRating } = req.query;
    
//     let filter = {};

//     if (category) filter.category = category;
//     if (minPrice || maxPrice) {
//       filter.discounted_price = {};
//       if (minPrice) filter.discounted_price.$gte = parseFloat(minPrice);
//       if (maxPrice) filter.discounted_price.$lte = parseFloat(maxPrice);
//     }
//     if (minRating || maxRating) {
//       filter.rating = {};
//       if (minRating) filter.rating.$gte = parseFloat(minRating);
//       if (maxRating) filter.rating.$lte = parseFloat(maxRating);
//     }

//     const products = await Product.find(filter);
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };


const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Productcontroller.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully"});
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Productcontroller.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


export default{
    add_product,
    getAllProducts,
    getProductById,
    // filterProducts,
    updateProduct,
    deleteProduct,
    getFiltersByCategory
}