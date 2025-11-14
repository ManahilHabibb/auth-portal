import { UserButton, useUser } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Bell, Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Projects', href: '#', current: false },
    { name: 'Team', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-md' 
            : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className={`w-7 h-7 ${scrolled ? 'text-indigo-600' : 'text-yellow-300'}`} />
                  </motion.div>
                  <h1 className={`text-xl font-bold ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                    RTK Dashboard
                  </h1>
                </motion.div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:ml-10 md:flex md:items-center md:space-x-8">
                {navLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`${
                      item.current 
                        ? (scrolled ? 'text-indigo-600 border-indigo-600' : 'text-white border-white')
                        : (scrolled ? 'text-gray-700 hover:text-indigo-600' : 'text-white/90 hover:text-white')
                    } px-3 py-2 text-sm font-medium border-b-2 border-transparent hover:border-current transition-colors duration-200`}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Right side items */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block"
              >
                <div className={`p-2 rounded-full ${scrolled ? 'bg-gray-100 hover:bg-gray-200' : 'bg-white/10 hover:bg-white/20'}`}>
                  <Search className={`h-5 w-5 ${scrolled ? 'text-gray-500' : 'text-white'}`} />
                </div>
              </motion.div>

              {/* Notifications */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block relative"
              >
                <div className={`p-2 rounded-full ${scrolled ? 'bg-gray-100 hover:bg-gray-200' : 'bg-white/10 hover:bg-white/20'}`}>
                  <Bell className={`h-5 w-5 ${scrolled ? 'text-gray-500' : 'text-white'}`} />
                </div>
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              </motion.div>

              {/* User Profile */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className={`p-0.5 rounded-full ${
                  scrolled 
                    ? 'bg-white shadow-md' 
                    : 'bg-white/20 hover:bg-white/30 backdrop-blur-xl border border-white/30'
                }`}
              >
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: `w-9 h-9 ${scrolled ? 'border-2 border-indigo-100' : 'border-2 border-white/50'}`,
                      userButtonAvatarBox: 'w-full h-full',
                    },
                  }}
                />
              </motion.div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
                >
                  {mobileMenuOpen ? (
                    <X className={`h-6 w-6 ${scrolled ? 'text-gray-900' : 'text-white'}`} />
                  ) : (
                    <Menu className={`h-6 w-6 ${scrolled ? 'text-gray-900' : 'text-white'}`} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`${
                      item.current 
                        ? 'bg-indigo-50 text-indigo-700 block px-3 py-2 rounded-md text-base font-medium'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium'
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      
      {/* Add padding to account for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}
