import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
  fullHeight?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, fullHeight = false }) => {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      <Header />
      
      <motion.main 
        className={`flex-1 w-full ${fullHeight ? 'flex flex-col' : ''}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
      
      <footer className="bg-white py-6 border-t border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <p className="text-sm text-neutral-500">
              © {new Date().getFullYear()} CalmCue. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-neutral-500 hover:text-primary-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-neutral-500 hover:text-primary-600 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-neutral-500 hover:text-primary-600 transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;