
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
          <div className="text-white">Get Property Values</div>
          <div className="relative inline-block">
            <div className="inline-block whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-[#9F7AEA] via-[#7C3AED] to-[#4F46E5]">
              with AI Magic
            </div>
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 1,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <div className="h-[3px] w-full bg-gradient-to-r from-[#9F7AEA] via-[#7C3AED] to-[#4F46E5] rounded-full" />
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
