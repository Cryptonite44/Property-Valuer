
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
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 relative z-10 break-words space-y-3">
          <div className="text-white tracking-tight glow animate-text-shine">AI-Powered</div>
          <div className="relative inline-block">
            <div className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#6366F1] to-[#3B82F6] animate-text-shine">
              Property Valuations
            </div>
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-[2px]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 1,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <svg
                className="w-full"
                height="3"
                viewBox="0 0 400 3"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 1.5C83.5 1.5 152.5 1.5 400 1.5"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="animate-draw"
                />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="400" y2="0">
                    <stop offset="0%" stopColor="#8B5CF6">
                      <animate
                        attributeName="stop-color"
                        values="#8B5CF6; #6366F1; #3B82F6; #8B5CF6"
                        dur="4s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="50%" stopColor="#6366F1">
                      <animate
                        attributeName="stop-color"
                        values="#6366F1; #3B82F6; #8B5CF6; #6366F1"
                        dur="4s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="100%" stopColor="#3B82F6">
                      <animate
                        attributeName="stop-color"
                        values="#3B82F6; #8B5CF6; #6366F1; #3B82F6"
                        dur="4s"
                        repeatCount="indefinite"
                      />
                    </stop>
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
        <p className="text-base sm:text-lg md:text-xl font-medium text-purple-200/90 tracking-wider">
          Get an AI-powered estimate based
        </p>
        <p className="text-base sm:text-lg md:text-xl font-medium text-blue-200/90 tracking-wider">
          on local market data
        </p>
      </motion.div>
    </motion.div>
  );
};
