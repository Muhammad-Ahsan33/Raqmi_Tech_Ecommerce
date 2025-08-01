import Navbar from '../Components/Navbar';
import Slider from '../Components/Slider';
import Sections from '../Components/Sections';
import Footer from '../Components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Slider />
        <Sections />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
