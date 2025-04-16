'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AlertCard from './components/AlertCard';
import HorizontalProcessFlow from './components/HorizontalProcessFlow';
import Navbar from './components/Navbar';
import {
  initialWithoutSimbianCounts,
  withoutSimbianContentLines,
  withSimbianSummaries
} from './alert';
import * as Icons from './components/Icons';

export default function Home() {
  const [isWithSimbian, setIsWithSimbian] = useState(false);
  const [bgColor, setBgColor] = useState('bg-gray-900');
  const [showHorizontalFlow, setShowHorizontalFlow] = useState(false);

  
  useEffect(() => {
    setBgColor(isWithSimbian ? 'bg-blue-950' : 'bg-gray-900');
    
    
    setShowHorizontalFlow(false);
    if (isWithSimbian) {
    
      const timer = setTimeout(() => {
        setShowHorizontalFlow(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isWithSimbian]);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const switchMode = () => {
    setIsWithSimbian(!isWithSimbian);
  };

  // Challenges section 
  const challengesContent = (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl font-bold text-red-400 mb-4">
          Challenges in Current Security Workflow
        </h3>
        
        <motion.div 
          className="space-y-4 mt-8"
          initial="initial"
          animate="animate"
          variants={{
            initial: { opacity: 0 },
            animate: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
        >
          {[
            { icon: "clock", text: "Waiting for Analyst - Analyst is dealing with other problems, hold on..." },
            { icon: "bell", text: "Wasting valuable analyst time on false positives" },
            { icon: "activity", text: "Processing one alert at a time, missing the big picture" },
            { icon: "shield", text: "More time fixing SOAR automation, less time on real threats" }
          ].map((item, index) => {
            const IconComponent = Icons[`${item.icon.charAt(0).toUpperCase() + item.icon.slice(1)}Icon`];
            
            return (
              <motion.div 
                key={index}
                className="flex items-center p-3 bg-red-950/40 rounded-lg border border-red-800/50"
                variants={{
                  initial: { opacity: 0, x: -20 },
                  animate: { 
                    opacity: 1, 
                    x: 0, 
                    transition: { duration: 0.4 } 
                  }
                }}
                whileHover={{
                  x: 5,
                  boxShadow: "0 4px 8px rgba(239, 68, 68, 0.3)",
                  transition: { duration: 0.2 }
                }}
              >
                <div className="text-red-400 mr-3">
                  <IconComponent />
                </div>
                <p className="text-red-200 text-sm">{item.text}</p>
              </motion.div>
            );
          })}
        </motion.div>
        
        <motion.p 
          className="mt-8 text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Manual processes lead to inefficiencies, missed threats, and increased risk.
        </motion.p>
      </motion.div>
    </div>
  );

  return (
    <main className={`min-h-screen ${bgColor} text-white transition-all duration-700 world-map-bg`}>
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6 md:mb-0"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className={isWithSimbian ? 'text-blue-400' : 'text-red-400'}>
              {isWithSimbian ? 'With' : 'Without'}
            </span> Simbian
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl mb-4 text-center md:text-right text-gray-300">
              {isWithSimbian 
                ? 'Relax. Our AI Agents will take it from here.' 
                : 'If this sounds all too familiar, you might want to...'}
            </h2>

            <motion.button 
              onClick={switchMode}
              className={`
                px-6 py-3 rounded-full font-medium shadow-lg 
                ${isWithSimbian 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'}
                transition-colors flex items-center justify-center w-full md:w-auto
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isWithSimbian ? 'Show Without Simbian' : ' Show With Simbian'}
              <svg 
                className="ml-2 w-5 h-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isWithSimbian ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                )}
              </svg>
            </motion.button>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Section - Alert Cards */}
          <div>
            <AnimatePresence mode="wait">
              {!isWithSimbian && (
                <motion.div 
                  key="without-simbian-left"
                  variants={containerVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-6"
                >
                  <AlertCard 
                    title="Ignored Alerts"
                    initialCount={initialWithoutSimbianCounts.ignoredAlerts}
                    contentLine={withoutSimbianContentLines[0]}
                    isWithSimbian={false}
                  />
                  <AlertCard 
                    title="Wrongly Closed"
                    initialCount={initialWithoutSimbianCounts.wronglyClosed}
                    contentLine={withoutSimbianContentLines[1]}
                    isWithSimbian={false}
                  />
                  <AlertCard 
                    title="Active Threats"
                    initialCount={initialWithoutSimbianCounts.activeThreats}
                    contentLine={withoutSimbianContentLines[2]}
                    isWithSimbian={false}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Section - Process Flow or Challenges */}
          <div>
            <AnimatePresence mode="wait">
              {!isWithSimbian && (
                <motion.div 
                  key="without-simbian-right"
                  className={`
                    p-6 rounded-lg shadow-xl backdrop-blur
                    bg-red-900/30 border-2 border-red-600
                    transition-all duration-500 min-h-[400px]
                  `}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {challengesContent}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* With Simbian View - Full Width */}
        <AnimatePresence>
          {isWithSimbian && (
            <motion.div 
              key="with-simbian"
              className="w-full mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {showHorizontalFlow ? (
                <HorizontalProcessFlow />
              ) : (
                <div className="h-64 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0, 1, 1, 0],
                      scale: [0.9, 1, 1, 0.9]
                    }}
                    transition={{ 
                      duration: 2,
                      times: [0, 0.3, 0.7, 1],
                      repeat: Infinity
                    }}
                    className="text-blue-400 text-xl flex items-center gap-3"
                  >
                    <div className="w-5 h-5">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin">
                        <path d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    Loading Simbian intelligence...
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}