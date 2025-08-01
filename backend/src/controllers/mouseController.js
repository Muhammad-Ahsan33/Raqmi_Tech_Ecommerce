import Product from "../models/productModel.js";

const getmousebyfilter = async (req, res) => {
  try {
      // const  category  = req.params;
      const { minPrice, maxPrice, minRating, maxRating  , subcategory , Maxdpi , Traking_methode} = req.query;

      // Convert price and rating values to numbers
      const minP = parseFloat(minPrice) || 0;
      const maxP = parseFloat(maxPrice) || Number.MAX_VALUE;
      const minR = parseFloat(minRating) || 0;
      const maxR = parseFloat(maxRating) || 5; // Default rating range from 0 to 5

      // Fetch products matching the category, price range, and rating range
      const products = await Product.find({
          category: "Mouse",
          sub_category: subcategory,
          discounted_price: { $gte: minP, $lte: maxP },
          rating: { $gte: minR, $lte: maxR },
          max_dpi: Maxdpi,
          tracking_method: Traking_methode

      });

      res.status(200).json({ success: true, products });
  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
};

const addmouse = async (product) =>{
  try{
    const newmouse = product;
    if(!newmouse.max_dpi || !newmouse.tracking_method){
      throw new Error("Data is not complete");

    }
    const addp = new Product({newmouse});
    const confpro = await new addp.save();
    if(!confpro){
      throw new Error("product not added");
    }
  }
  catch(error){
    throw new Error("Product cant be added due to server issues");
  }
}

export default { getmousebyfilter , addmouse};
