import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  const location = useLocation();
  useEffect(() => {
    Aos.init({ duration: 1000, easing: 'ease-in-out' });
  }, []);

  useEffect(() => {
    Aos.refresh();
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />
      {/* Dynamic children component from router */}
      <Outlet />

      {/* Footer */}
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default MainLayout;
