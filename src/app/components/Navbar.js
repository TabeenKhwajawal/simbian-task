'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      className="w-full py-4 px-8 flex justify-between items-center glass-effect"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-2">
        <motion.div
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 40 40" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-blue-500"
          >
            <path 
              d="M20 5L4 13L20 21L36 13L20 5Z" 
              fill="currentColor" 
              fillOpacity="0.8"
            />
            <path 
              d="M4 21L20 29L36 21" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M4 29L20 37L36 29" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeOpacity="0.6"
            />
          </svg>
          <span className="ml-2 text-xl font-bold text-white">Simbian</span>
        </motion.div>
      </div>

      <div className="hidden md:flex space-x-8 items-center">
        <NavLink text="Products" />
        <NavLink text="Company" />
        <NavLink text="Resources" />
        <NavLink text="Blog" />
      </div>

      <motion.button
        className="px-4 py-2 bg-blue-600 text-white rounded-full flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span>Book a Demo</span>
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M8 5.5V10.5" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M5.5 8H10.5" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </motion.button>
    </motion.nav>
  );
};

const NavLink = ({ text }) => (
  <motion.a
    href="#"
    className="text-gray-300 hover:text-white transition-colors relative group"
    whileHover="hover"
  >
    {text}
    <motion.span
      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500 origin-left"
      initial={{ scaleX: 0 }}
      variants={{
        hover: { scaleX: 1, transition: { duration: 0.3 } }
      }}
    />
  </motion.a>
);

export default Navbar;