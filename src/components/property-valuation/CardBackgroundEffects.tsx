
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
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <motion.path
          d="M70,30 C60,50 40,50 30,70"
          stroke="url(#line-gradient)"
          strokeWidth="0.5"
          fill="none"
          strokeDasharray="1 3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
        />
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </motion.svg>
      
      {/* Animation dots */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-purple-500/30"
          style={{
            top: `${25 + Math.random() * 50}%`,
            left: `${25 + Math.random() * 50}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 20, 0],
            opacity: [0, 0.7, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 2,
          }}
        />
      ))}
      
      {/* Map-like points */}
      <motion.div
        className="absolute left-[20%] top-[30%] w-3 h-3 rounded-full bg-purple-500/50"
        initial={{ scale: 0 }}
        animate={{ 
          scale: [0, 1.2, 1],
          opacity: [0, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          delay: 0.5,
        }}
      />
      <motion.div
        className="absolute left-[80%] top-[40%] w-2 h-2 rounded-full bg-blue-500/50"
        initial={{ scale: 0 }}
        animate={{ 
          scale: [0, 1.1, 0.9],
          opacity: [0, 0.7, 0.4],
        }}
        transition={{
          duration: 2,
          delay: 1,
        }}
      />
      <motion.div
        className="absolute left-[30%] top-[70%] w-2 h-2 rounded-full bg-purple-500/50"
        initial={{ scale: 0 }}
        animate={{ 
          scale: [0, 1.1, 0.9],
          opacity: [0, 0.7, 0.4],
        }}
        transition={{
          duration: 2,
          delay: 1.5,
        }}
      />
    </div>
  );
};
