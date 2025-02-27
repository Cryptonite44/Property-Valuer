
import React from "react";
import { motion } from "framer-motion";

export const CardBackgroundEffects = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Connection lines */}
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <motion.path
          d="M70,30 C60,50 40,50 30,70"
          stroke="url(#line-gradient)"
          strokeWidth="0.3"
          fill="none"
          strokeDasharray="1 3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
        />
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </motion.svg>
      
      {/* Animation dots with varied sizes */}
      {[...Array(8)].map((_, i) => {
        // Generate varied sizes between 1px and 2px
        const size = 1 + Math.random();
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-purple-500/30"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${20 + Math.random() * 60}%`,
              width: `${size}px`,
              height: `${size}px`,
            }}
            animate={{
              y: [0, -10 - Math.random() * 10, 0],
              x: [0, 10 + Math.random() * 10, 0],
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 1.5,
            }}
          />
        );
      })}
      
      {/* Map-like points with varied sizes */}
      <motion.div
        className="absolute left-[20%] top-[30%] w-2 h-2 rounded-full bg-purple-500/40"
        initial={{ scale: 0 }}
        animate={{ 
          scale: [0, 1.1, 0.9],
          opacity: [0, 0.6, 0.4],
        }}
        transition={{
          duration: 2,
          delay: 0.5,
        }}
      />
      <motion.div
        className="absolute left-[80%] top-[40%] w-1.5 h-1.5 rounded-full bg-blue-500/40"
        initial={{ scale: 0 }}
        animate={{ 
          scale: [0, 1.1, 0.9],
          opacity: [0, 0.5, 0.3],
        }}
        transition={{
          duration: 2,
          delay: 1,
        }}
      />
      <motion.div
        className="absolute left-[30%] top-[70%] w-1 h-1 rounded-full bg-purple-500/40"
        initial={{ scale: 0 }}
        animate={{ 
          scale: [0, 1.1, 0.9],
          opacity: [0, 0.5, 0.3],
        }}
        transition={{
          duration: 2,
          delay: 1.5,
        }}
      />
      {/* Additional smaller points */}
      <motion.div
        className="absolute left-[65%] top-[25%] w-1 h-1 rounded-full bg-indigo-500/30"
        initial={{ scale: 0 }}
        animate={{ 
          scale: [0, 1, 0.8],
          opacity: [0, 0.4, 0.2],
        }}
        transition={{
          duration: 1.5,
          delay: 2,
        }}
      />
      <motion.div
        className="absolute left-[45%] top-[60%] w-0.5 h-0.5 rounded-full bg-pink-500/30"
        initial={{ scale: 0 }}
        animate={{ 
          scale: [0, 1.2, 0.8],
          opacity: [0, 0.4, 0.2],
        }}
        transition={{
          duration: 1.5,
          delay: 2.5,
        }}
      />
    </div>
  );
};
