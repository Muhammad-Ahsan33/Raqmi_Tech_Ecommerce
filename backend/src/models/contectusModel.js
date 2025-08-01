import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  // Static contact details (Updated by Admin)
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  workingHours: { type: String, required: true },

  // Array of user queries (Dynamically growing)
  queries: [
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      message: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
