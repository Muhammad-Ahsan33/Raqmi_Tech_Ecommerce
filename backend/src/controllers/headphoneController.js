import Product from "../models/productModel.js";

const getheadphonesbyfilter = async (req, res) => {
  try {
      // const  category  = req.params;
      const { minPrice, maxPrice, minRating, maxRating  , subcategory , Microphone , Connectivity} = req.query;

      // Convert price and rating values to numbers
      const minP = parseFloat(minPrice) || 0;
      const maxP = parseFloat(maxPrice) || Number.MAX_VALUE;
      const minR = parseFloat(minRating) || 0;
      const maxR = parseFloat(maxRating) || 5; // Default rating range from 0 to 5

      // Fetch products matching the category, price range, and rating range
      const products = await Product.find({
          category: "Headphone",
          sub_category: subcategory,
          discounted_price: { $gte: minP, $lte: maxP },
          rating: { $gte: minR, $lte: maxR },
          microphone: Microphone,
          connectivity: Connectivity


      });

      res.status(200).json({ success: true, products });
  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
};


const addheadphone= async (product) =>{
  try{
    const newheadphone = product;
    if(!newheadphone.microphone || !newheadphone.connectivity){
      throw new Error("Data is not complete");

    }
    const addp = new Product({newheadphone});
    const confpro = await new addp.save();
    if(!confpro){
      throw new Error("product not added");
    }
  }
  catch(error){
    throw new Error("Product cant be added due to server issues");
  }
}

export default { getheadphonesbyfilter , addheadphone};
