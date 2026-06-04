import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text">
      <Navbar />
      <motion.main
        className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-5 pt-24 pb-16 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  );
}
