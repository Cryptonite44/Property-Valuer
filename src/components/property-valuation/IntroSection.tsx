
import React from "react";
import { motion } from "framer-motion";
import TypewriterText from "@/components/TypewriterText";

export const IntroSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center mb-8 space-y-6 relative w-full max-w-screen-lg mx-auto px-4"
    >
      <div className="relative">
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 blur-3xl"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
        />
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 relative z-10 break-words space-y-2">
          <div className="text-white">Property Valuations</div>
          <div className="relative inline-block">
            <div className="inline-block whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-[#9F7AEA] via-[#7C3AED] to-[#4F46E5]">
              with AI Magic
            </div>
            <motion.div
              className="absolute -bottom-2 left-0 right-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.5
              }}
            >
              <svg
                width="100%"
                height="12"
                viewBox="0 0 200 12"
                fill="none"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M0 3C20 3 30 9 50 9C70 9 80 3 100 3C120 3 130 9 150 9C170 9 180 3 200 3"
                  stroke="url(#underline-gradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 1.5,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
                <defs>
                  <linearGradient id="underline-gradient" x1="0" y1="0" x2="100%" y2="0">
                    <stop stopColor="#9F7AEA" offset="0%" />
                    <stop stopColor="#7C3AED" offset="50%" />
                    <stop stopColor="#4F46E5" offset="100%" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </div>
        </h1>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 0.2,
          duration: 0.8,
          ease: "easeOut"
        }}
        className="space-y-3"
      >
        <p className="text-base sm:text-lg md:text-xl font-medium text-white/80 tracking-wider">
          Get instant property valuations powered by AI
        </p>
      </motion.div>
    </motion.div>
  );
};
