// models/HomePage.js
import {Schema , model} from 'mongoose'

const HomePageSchema = new Schema({
  banners: [
    {
      image: String,
      link: String,
    },
  ],
  categories: [
    {
      name: String,
      image: String,
      slug: String,
    },
  ],
  featuredProducts: [
    {
      title: String,
      price: Number,
      image: String,
      discountPrice: Number,
      slug: String,
    },
  ],
  testimonials: [
    {
      customerName: String,
      review: String,
      rating: Number,
    },
  ],
});

const HomePage = model("HomePage", HomePageSchema);
export default HomePage;
