
import React from "react";
import { motion } from "framer-motion";

export const BackgroundEffects = () => {
  return (
    <>
      <motion.div
        className="absolute -inset-2 bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#0EA5E9] opacity-75 blur-2xl rounded-lg"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -inset-2 bg-gradient-to-r from-[#F97316] via-[#8B5CF6] to-[#D946EF] opacity-75 blur-2xl rounded-lg"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating particles with increased visibility */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 6 + 3 + "px", // Increased size
              height: Math.random() * 6 + 3 + "px", // Increased size
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              background: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`, // Increased opacity
              boxShadow: '0 0 4px rgba(255, 255, 255, 0.5)', // Added glow effect
            }}
            animate={{
              y: [0, -50, 0], // Increased movement range
              x: [0, Math.random() * 40 - 20, 0], // Increased movement range
              opacity: [0.4, 1, 0.4], // Increased opacity range
              scale: [1, 1.2, 1], // Added scale animation
            }}
            transition={{
              duration: Math.random() * 4 + 3, // Slightly slower
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Large glowing orbs */}
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full mix-blend-overlay filter blur-xl"
          animate={{
            y: [0, 50, 0],
            x: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full mix-blend-overlay filter blur-xl"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Additional gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full mix-blend-overlay filter blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-full mix-blend-overlay filter blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
    </>
  );
};
