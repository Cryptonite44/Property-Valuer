
import React from "react";
import { motion } from "framer-motion";
import TypewriterText from "@/components/TypewriterText";

export const IntroSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center mb-8 space-y-6 relative w-full max-w-screen-sm mx-auto px-4"
    >
      <div className="relative">
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 blur-2xl"
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
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 relative z-10 break-words">
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white [background-size:200%_auto] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] will-change-transform">
            <TypewriterText 
              texts={[
                { text: "AI-Powered", delay: 50 },
                { text: " Property", delay: 150 },
                { text: " Valuations", delay: 150 }
              ]}
            />
          </span>
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
        <p className="text-base sm:text-lg md:text-xl font-medium text-purple-200/90 tracking-wider">
          Get an AI-powered estimate based
        </p>
        <p className="text-base sm:text-lg md:text-xl font-medium text-blue-200/90 tracking-wider">
          on local market data
        </p>
        <motion.div
          className="w-24 h-1 mx-auto mt-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: '6rem' }}
          transition={{ 
            delay: 0.4,
            duration: 1.2,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
};
