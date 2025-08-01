import {Schema , model} from "mongoose";

const aboutSchema = new Schema({
  title: { type: String, required: true }, // About Us page title
  description: { type: String, required: true }, // Detailed About Us text
  mission: String, // Company mission statement
  vision: String, // Company vision statement
  team: [
    {
      name: String,
      position: String,
      image: String, // URL of team member image
    },
  ],
  updatedAt: { type: Date, default: Date.now },
});

const About = model("About", aboutSchema);

export default About;
