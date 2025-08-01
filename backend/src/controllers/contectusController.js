import Contact from "../models/contectusModel.js";

// Get Contact Us Page Data
const getContactInfo = async (req, res) => {
  try {
    const contactData = await Contact.findOne();
    if (!contactData) {
      return res.status(404).json({ message: "Contact Us page data not found" });
    }
    res.status(200).json(contactData);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Update Contact Us Page Data (Admin)
const updateContactInfo = async (req, res) => {
  try {
    const updatedData = await Contact.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true, // Creates a new document if not found
    });
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Submit a User Query
const submitQuery = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const contactData = await Contact.findOne();
    if (!contactData) {
      return res.status(404).json({ error: "Contact Us page data not found" });
    }

    // Push new query into the queries array
    contactData.queries.push({ name, email, message });
    await contactData.save();

    res.status(201).json({ error: "Query submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: " Server Error", error });
  }
};

// Get All User Queries (Admin)
const getQueries = async (req, res) => {
  try {
    const contactData = await Contact.findOne();
    if (!contactData) {
      return res.status(404).json({ message: "No queries found" });
    }
    res.status(200).json(contactData.queries);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export default{
    getContactInfo,
    updateContactInfo,
    submitQuery,
    getQueries
}