'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateRandomAlert } from '../alert';
import * as Icons from './Icons';

const getSeverityColor = (severity) => {
  switch (severity) {
    case 'critical': return 'bg-red-600/60 border-red-500 shadow-red-500/30 shadow-inner';
    case 'high': return 'bg-orange-600/60 border-orange-500 shadow-orange-500/30 shadow-inner';
    case 'medium': return 'bg-yellow-600/60 border-yellow-500 shadow-yellow-500/30 shadow-inner';
    case 'low': return 'bg-blue-600/60 border-blue-500 shadow-blue-500/30 shadow-inner';
    default: return 'bg-gray-600/60 border-gray-500 shadow-gray-500/30 shadow-inner';
  }
};

const getAlertIcon = (type) => {
  const iconMap = {
    "Phishing Email": "Mail",
    "Suspicious Login": "LogIn",
    "Malware Detected": "AlertTriangle",
    "Unusual Network Traffic": "Activity",
    "Password Attempt Failed": "Lock",
    "Data Exfiltration": "Database",
    "Privilege Escalation": "Shield",
    "Suspicious File Download": "FileDown",
    "Unauthorized Access": "UserX",
    "Configuration Change": "Settings"
  };
  
  const iconName = iconMap[type] || "Bell";
  return Icons[`${iconName}Icon`] || Icons.BellIcon;
};

const AlertCard = ({ 
  title,
  initialCount, 
  contentLine, 
  isWithSimbian = false
}) => {
  const [count, setCount] = useState(isWithSimbian ? 0 : initialCount);
  const [alerts, setAlerts] = useState([]);
  const [shake, setShake] = useState(false);
  const [displayTitle, setDisplayTitle] = useState(
    title
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
  );
  const prevIsWithSimbian = useRef(isWithSimbian);
  const iconName = title.includes("Ignored") ? "Bell" : 
                  title.includes("Wrongly") ? "Clock" : 
                  title.includes("Active") ? "Shield" : "Alert";
  const IconComponent = Icons[`${iconName}Icon`];

  // Handle mode change
  useEffect(() => {
    
    setAlerts([]);
    
    if (isWithSimbian !== prevIsWithSimbian.current) {
      
      setCount(isWithSimbian ? 0 : initialCount);
      prevIsWithSimbian.current = isWithSimbian;
    }
  }, [isWithSimbian, initialCount]);

  // Generate new alerts only in "Without Simbian" mode
  useEffect(() => {
    if (!isWithSimbian) {
      const intervalId = setInterval(() => {
        const newAlert = generateRandomAlert();
        setAlerts(prevAlerts => {
          const updatedAlerts = [newAlert, ...prevAlerts].slice(0, 3);
          return updatedAlerts;
        });
        

        setCount(prevCount => {
          const newCount = prevCount + 1;
          setShake(true);
          return newCount;
        });
      }, 3000);

      return () => clearInterval(intervalId);
    }
  }, [isWithSimbian]);

  
  useEffect(() => {
    if (shake) {
      const timer = setTimeout(() => {
        setShake(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [shake]);

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3 }
    },
    shake: {
      boxShadow: [
        "0 0 0 rgba(239, 68, 68, 0.5)",
        "0 0 20px rgba(239, 68, 68, 0.8)",
        "0 0 0 rgba(239, 68, 68, 0.5)"
      ],
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  };

  const countVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 300 }
    },
    shake: {
      x: [0, -10, 10, -5, 5, 0],
      scale: [1, 1.1, 1],
      color: ["#f87171", "#f87171", "#f87171", "#f87171", "#f87171", "#f87171"],
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  };

  const alertVariants = {
    initial: { opacity: 0, y: -30, scale: 0.9 },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.4,
        type: "spring",
        stiffness: 120
      }
    },
    exit: { 
      opacity: 0, 
      y: 30,
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  };

  const iconVariants = {
    initial: { scale: 0, rotate: -45 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    pulse: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: { 
        duration: 2,
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };

  const checkmarkVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.5, 
        type: "spring",
        delay: 0.2
      }
    }
  };

  return (
    <motion.div 
      className={`
        p-5 rounded-lg shadow-lg backdrop-blur-sm relative overflow-hidden
        ${isWithSimbian 
          ? 'bg-blue-800/50 border-2 border-blue-500 shadow-blue-500/20' 
          : 'bg-red-900/40 border-2 border-red-600 shadow-red-600/20'}
        transition-all duration-300 ease-in-out
        ${shake && !isWithSimbian ? 'alert-pulse' : ''}
      `}
      variants={cardVariants}
      initial="initial"
      animate={shake && !isWithSimbian ? ["animate", "shake"] : "animate"}
      exit="exit"
    >

      
      <div className="flex items-center gap-3 mb-4">
        <motion.div 
          className={`text-2xl ${isWithSimbian ? 'text-blue-400' : 'text-red-400'}`}
          variants={iconVariants}
          initial="initial"
          animate={["animate", "pulse"]}
        >
          <IconComponent />
        </motion.div>
        
        <div className="flex-1">
          <h3 className={`font-bold text-lg ${isWithSimbian ? 'text-blue-400' : 'text-red-400'}`}>
            {displayTitle}
          </h3>
          
          {contentLine && (
            <p className={`
              text-sm 
              ${isWithSimbian ? 'text-blue-300' : 'text-red-300'}
            `}>
              {contentLine}
            </p>
          )}
        </div>

        <motion.div 
          className={`
            text-3xl font-bold flex items-center
            ${isWithSimbian ? 'text-blue-400' : 'text-red-400'}
            px-3 py-1 rounded-full ${isWithSimbian ? 'bg-blue-900/40' : 'bg-red-900/40'}
          `}
          key={`${isWithSimbian}-${count}`}
          variants={countVariants}
          initial="initial"
          animate={shake ? "shake" : "animate"}
        >
          {isWithSimbian && (
            <motion.div 
              variants={checkmarkVariants}
              initial="initial"
              animate="animate"
              className="text-green-400 mr-2 sparkle"
            >
              ✓
            </motion.div>
          )}
          {count}
        </motion.div>
      </div>

      <AnimatePresence>
        {!isWithSimbian && alerts.map((alert) => (
          <motion.div
            key={alert.id}
            className={`
              p-3 rounded-lg mb-3 text-sm border flex items-center gap-2
              ${getSeverityColor(alert.severity)}
              ${alert.severity === 'critical' ? 'glow-critical' : ''}
            `}
            variants={alertVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className={`
              text-lg ${alert.severity === 'critical' ? 'text-red-300' : 
                         alert.severity === 'high' ? 'text-orange-300' : 
                         alert.severity === 'medium' ? 'text-yellow-300' : 'text-blue-300'}
            `}>
              {React.createElement(getAlertIcon(alert.type))}
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="font-semibold">{alert.type}</span>
                <span className="text-xs opacity-70">{alert.source}</span>
              </div>
              <div className="text-xs opacity-70 mt-1">
                {new Date(alert.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {!isWithSimbian && (
        <div className="flex justify-end gap-1 mt-2">
          {[...Array(3)].map((_, i) => (
            <motion.div 
              key={i}
              className={`h-2 w-2 rounded-full 
                ${i < alerts.length ? 'bg-red-500' : 'bg-gray-700'}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default AlertCard;