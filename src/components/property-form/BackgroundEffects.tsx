
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
      </div>
    </>
  );
};
