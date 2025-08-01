import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminPanel } from "./Pages/Admin Panel/AdminPanel";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./Pages/Home/pages/Home";
import Cart from "./Pages/Home/pages/Cart";
import { CartProvider } from './Pages/Home/pages/CartContext';
import AboutUs from "./Pages/Home/pages/AboutUs";
import CheckOut from "./Pages/Home/pages/CheckOut";
import Auth from "./Pages/Auth/Authpage";
import OrderConfirmation from "./Pages/Home/pages/OrderConfirmation";
import ProductDetails from "./Pages/Home/pages/ProductDetails";
import SearchResults from "./Pages/Home/pages/SearchResults";
import Desktops from './Pages/Home/Components/Sections/Desktops';
import Laptops from './Pages/Home/Components/Sections/Laptops';
import FeaturedProducts from './Pages/Home/Components/Sections/FeaturedProducts';
import TopRatedProducts from './Pages/Home/Components/Sections/TopRatedProducts';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/admin/*" element={<AdminPanel />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/desktops" element={<Desktops />} />
          <Route path="/laptops" element={<Laptops />} />
          <Route path="/featured-products" element={<FeaturedProducts />} />
          <Route path="/top-rated-products" element={<TopRatedProducts />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </Router>
      
      {/* Toast Container for notifications */}
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="colored"
      />
    </CartProvider>
  );
}

export default App;