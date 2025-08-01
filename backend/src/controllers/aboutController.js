import About from "../models/aboutModel.js"; // Import About Us model

// Get About Us Page Data
export const getAboutUs = async (req, res) => {
  try {
    const aboutData = await About.findOne();
    if (!aboutData) {
      return res.status(404).json({ message: "About Us page data not found" });
    }
    res.status(200).json(aboutData);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Update About Us Page Data (Admin)
export const updateAboutUs = async (req, res) => {
  try {
    const updatedData = await About.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true, // Creates a new document if not found
    });
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export default{
    getAboutUs,
    updateAboutUs
}