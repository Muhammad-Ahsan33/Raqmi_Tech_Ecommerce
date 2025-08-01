import Product from "../models/productModel.js";

// Function to get products by category, price range, and rating range
const getspeakerbyfilter = async (req, res) => {
  try {
      // const  category  = req.params;
      const { minPrice, maxPrice, minRating, maxRating  , subcategory , Wattagge , Frequency_response} = req.query;

      // Convert price and rating values to numbers
      const minP = parseFloat(minPrice) || 0;
      const maxP = parseFloat(maxPrice) || Number.MAX_VALUE;
      const minR = parseFloat(minRating) || 0;
      const maxR = parseFloat(maxRating) || 5; // Default rating range from 0 to 5

      // Fetch products matching the category, price range, and rating range
      const products = await Product.find({
          category: "Speaker",
          sub_category: subcategory,
          discounted_price: { $gte: minP, $lte: maxP },
          rating: { $gte: minR, $lte: maxR },
          wattage: Wattagge,
          frequency_response: Frequency_response

      });

      res.status(200).json({ success: true, products });
  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
};

const addspeaker = async (product) =>{
  try{
    const newspeaker = product;
    if(!newspeaker.wattage || !newspeaker.frequency_response){
      throw new Error("Data is not complete");

    }
    const addp = new Product({newspeaker});
    const confpro = await new addp.save();
    if(!confpro){
      throw new Error("product not added");
    }
  }
  catch(error){
    throw new Error("Product cant be added due to server issues");
  }
}

export default { getspeakerbyfilter , addspeaker};
