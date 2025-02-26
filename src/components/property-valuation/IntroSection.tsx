
import React from "react";
import { motion } from "framer-motion";
import TypewriterText from "@/components/TypewriterText";
import { Sparkles } from "lucide-react";

export const IntroSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center mb-8 space-y-6 relative w-full max-w-screen-lg mx-auto px-4 pt-20"
    >
      <div className="absolute top-0 right-4">
        <div className="feature-pill">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">AI-Powered Property Valuation</span>
        </div>
      </div>

      <div className="relative">
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-purple-500/5 blur-3xl"
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
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 relative z-10 flex flex-col items-center gap-4">
          <div className="text-white">Property Valuations</div>
          <div className="relative inline-block">
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 pb-2">
              with AI Magic
            </span>
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
                height="15"
                viewBox="0 0 200 15"
                fill="none"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M0 5C12 5 15 12 28 12S44 5 56 5 72 12 84 12 100 5 112 5s28 7 40 7S168 5 180 5s16 7 20 7"
                  stroke="url(#underline-gradient)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    duration: 1.5,
                    ease: [0.43, 0.13, 0.23, 0.96],
                    delay: 0.5
                  }}
                />
                <defs>
                  <linearGradient id="underline-gradient" x1="0" y1="0" x2="100%" y2="0">
                    <stop stopColor="#C084FC" offset="0%" />
                    <stop stopColor="#818CF8" offset="50%" />
                    <stop stopColor="#60A5FA" offset="100%" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </div>
        </h1>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 0.2,
          duration: 0.8,
          ease: "easeOut"
        }}
        className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto"
      >
        Transform your property valuation process. Just describe what you need,
        and watch AI do the heavy lifting.
      </motion.p>
    </motion.div>
  );
};
