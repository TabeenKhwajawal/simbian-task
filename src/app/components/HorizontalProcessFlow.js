'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from './Icons';
import { withSimbianSummaries } from '../alert';

const HorizontalProcessFlow = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [animateProcess, setAnimateProcess] = useState(false);
  
  // Steps in the horizontal flow process
  const steps = [
    {
      id: 1,
      name: "Triaged & Reported",
      description: "SOC Agent handled investigation and reporting",
      icon: "search"
    },
    {
      id: 2,
      name: "Automated Response",
      description: "Incident automatically contained",
      icon: "shield"
    },
    {
      id: 3,
      name: "Comprehensive Analysis",
      description: "AI recognized patterns",
      icon: "activity"
    },
    {
      id: 4,
      name: "Accurate Detection",
      description: "Zero false positives",
      icon: "check"
    },
    {
      id: 5,
      name: "24/7 Coverage",
      description: "No analyst fatigue",
      icon: "clock"
    }
  ];


  useEffect(() => {
    
    const timer = setTimeout(() => {
      setAnimateProcess(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Cycle through active steps for pulse animation effect
  useEffect(() => {
    if (!animateProcess) return;
    
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [steps.length, animateProcess]);

  
  const getIconComponent = (iconName) => {
    const iconMap = {
      'search': Icons.SearchIcon,
      'shield': Icons.ShieldIcon,
      'activity': Icons.ActivityIcon,
      'check': Icons.CheckIcon,
      'clock': Icons.ClockIcon,
    };
    return iconMap[iconName] || Icons.CheckIcon;
  };

  
  const stepVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i) => ({ 
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    }),
    pulse: {
      scale: [1, 1.05, 1],
      boxShadow: [
        "0 0 0 rgba(59, 130, 246, 0.4)",
        "0 0 15px rgba(59, 130, 246, 0.8)",
        "0 0 0 rgba(59, 130, 246, 0.4)"
      ],
      transition: { duration: 1.5, repeat: Infinity }
    }
  };

  const iconVariants = {
    initial: { scale: 0, rotate: -45 },
    animate: (i) => ({
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: i * 0.15
      }
    }),
    pulse: {
      scale: [1, 1.2, 1],
      transition: { duration: 1, repeat: Infinity }
    }
  };

  const pathVariants = {
    initial: { width: 0, opacity: 0 },
    animate: (i) => ({
      width: "100%",
      opacity: 1,
      transition: { 
        delay: i * 0.15 + 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const summaryCardVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: (i) => ({ 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        delay: 1.5 + (i * 0.2), 
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    }),
    hover: {
      scale: 1.03,
      y: -5,
      transition: { duration: 0.2 }
    }
  };
  
  const checkmarkVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i) => ({
      scale: 1,
      opacity: 1,
      transition: { 
        delay: 2 + (i * 0.2), 
        duration: 0.5, 
        type: "spring" 
      }
    })
  };

  const numberVariants = {
    initial: { opacity: 0 },
    animate: (i) => ({
      opacity: 1,
      transition: { delay: 1.8 + (i * 0.2), duration: 0.3 }
    })
  };

  const finalBannerVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 2.5, duration: 0.5, type: "spring" }
    }
  };

  return (
    <div className="w-full">
      {/* Horizontal steps container with gradient background */}
      <motion.div 
        className="relative p-6 rounded-xl bg-gradient-to-br from-blue-950 to-blue-900 border border-blue-700/30 shadow-xl mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-1 md:gap-2 mb-2">
          {steps.map((step, index) => {
            const IconComponent = getIconComponent(step.icon);
            const isActive = index === activeStep && animateProcess;

            return (
              <React.Fragment key={step.id}>
                {/* Step card */}
                <motion.div
                  custom={index}
                  variants={stepVariants}
                  initial="initial"
                  animate={isActive ? ["animate", "pulse"] : "animate"}
                  whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
                  className={`
                    relative flex flex-col items-center p-4 bg-gradient-to-b from-blue-900/80 to-blue-950 backdrop-blur-sm rounded-lg border
                    ${isActive ? 'border-blue-400 shadow-lg shadow-blue-500/20' : 'border-blue-500/30'}
                    w-full md:w-1/5 min-h-[8rem] justify-center text-center z-10
                  `}
                >
                  <motion.div
                    className={`text-2xl mb-2 ${isActive ? 'text-blue-400' : 'text-blue-500/80'}`}
                    variants={iconVariants}
                    custom={index}
                    initial="initial"
                    animate={isActive ? ["animate", "pulse"] : "animate"}
                  >
                    <IconComponent />
                  </motion.div>
                  <h3 className="font-bold text-sm md:text-base">{step.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">{step.description}</p>
                  
                
                  {isActive && (
                    <motion.div 
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 rounded-full bg-blue-500"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>

                {/* Connecting path between steps */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block w-4 relative">
                    <motion.div
                      className="absolute top-1/2 transform -translate-y-1/2 h-0.5 bg-blue-500 w-0"
                      custom={index}
                      variants={pathVariants}
                      initial="initial"
                      animate={animateProcess ? "animate" : "initial"}
                    >
                    
                     {/* Animated dot for active step */}
                      {animateProcess && activeStep > index && (
                        <motion.div 
                          className="absolute top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-md shadow-blue-300"
                          initial={{ left: "0%" }}
                          animate={{ left: "100%" }}
                          transition={{ 
                            duration: 0.5, 
                            ease: "easeInOut"
                          }}
                        />
                      )}
                      
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-3 w-3">
                        <svg viewBox="0 0 20 20" fill="currentColor" className="text-blue-400">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </motion.div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
        
        {/* Process flow progress indicator */}
        <div className="flex justify-center mt-4">
          {steps.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full mx-1 ${index === activeStep && animateProcess ? 'bg-blue-400' : 'bg-blue-800'}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Alert cards with Simbian summaries */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {[
          { 
            title: "Ignored Alerts", 
            description: withSimbianSummaries[0],
            bgClass: "from-blue-900/60 to-blue-950",
            borderClass: "border-blue-500/40",
            textClass: "text-blue-400",
            textLightClass: "text-blue-200"
          },
          { 
            title: "Wrongly Closed", 
            description: withSimbianSummaries[1],
            bgClass: "from-indigo-900/60 to-indigo-950",
            borderClass: "border-indigo-500/40",
            textClass: "text-indigo-400",
            textLightClass: "text-indigo-200"
          },
          { 
            title: "Active Threats", 
            description: withSimbianSummaries[2],
            bgClass: "from-teal-900/60 to-teal-950",
            borderClass: "border-teal-500/40",
            textClass: "text-teal-400",
            textLightClass: "text-teal-200"
          }
        ].map((card, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={summaryCardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className={`
              p-5 rounded-lg border ${card.borderClass} shadow-sm
              bg-gradient-to-br ${card.bgClass}
              backdrop-blur-sm
            `}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className={`font-semibold ${card.textClass}`}>{card.title}</h3>
              <div className="flex items-center px-3 py-1 rounded-full bg-blue-900/70">
                <motion.div
                  className="text-green-400 mr-1 sparkle"
                  custom={index}
                  variants={checkmarkVariants}
                  initial="initial"
                  animate="animate"
                >
                  <Icons.CheckIcon />
                </motion.div>
                <motion.span
                  className={`text-2xl font-bold ${card.textClass}`}
                  custom={index}
                  variants={numberVariants}
                  initial="initial"
                  animate="animate"
                >
                  0
                </motion.span>
              </div>
            </div>
            
            <p className={`text-sm ${card.textLightClass}`}>{card.description}</p>
            
            
            <div className="mt-3 pt-3 border-t border-blue-700/30 flex">
              <div className="text-blue-500/40 mr-2">
                <Icons.ShieldIcon />
              </div>
              <div className="text-xs text-blue-300/70">
                Simbian defenses active and monitoring
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Final banner with Simbian technology summary */}
      <motion.div
        variants={finalBannerVariants}
        initial="initial"
        animate="animate"
        className="mt-6 p-5 bg-gradient-to-r from-blue-900/80 to-indigo-900/80 rounded-lg border border-blue-400/40 text-center shadow-lg"
      >
        <div className="flex items-center justify-center">
          <motion.div
            className="text-blue-400 mr-3 text-2xl"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 2.7, type: "spring", stiffness: 200 }}
          >
            <Icons.ActivityIcon />
          </motion.div>
          <div>
            <h3 className="text-blue-200 font-medium text-lg">{withSimbianSummaries[3]}</h3>
            <p className="text-blue-300/70 mt-1 text-sm">Enterprise-grade protection powered by Simbian technology</p>
          </div>
        </div>
        
        
        <div className="mt-4 flex justify-center space-x-2">
          {[0.3, 0.5, 0.8, 1, 0.7, 0.4, 0.6, 0.9, 0.5, 0.3, 0.7, 0.8].map((height, i) => (
            <motion.div
              key={i}
              className="w-1 bg-blue-500/50 rounded-full"
              style={{ height: `${height * 30}px` }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 2.8 + (i * 0.05), duration: 0.4 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HorizontalProcessFlow;