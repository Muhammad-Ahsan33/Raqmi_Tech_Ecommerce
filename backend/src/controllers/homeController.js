// controllers/homeController.js
import HomeModel from '../models/homeModel.js'

// Get Home Page Data
const getHomePage = async (req, res) => {
  try {
    const homePageData = await HomeModel.findOne(); // Fetching homepage content
    if (!homePageData) {
      return res.status(404).json({ message: "Home page data not found" });
    }
    return res.status(200).json(homePageData);
  } catch (error) {
    return res.status(500).json({ message: "Error while Fetching Home Page", error });
  }
};

// Update Home Page Data
const updateHomePage = async (req, res) => {
  try {
    const updatedData = await HomeModel.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    return res.status(200).json(updatedData);
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};

export default{
    getHomePage,
    updateHomePage
}