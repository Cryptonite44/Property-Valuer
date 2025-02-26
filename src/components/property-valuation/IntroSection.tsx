import React from "react";
import { motion, useAnimationControls } from "framer-motion";
import TypewriterText from "@/components/TypewriterText";
import { PoundSterling, TrendingUp, ChartBar } from "lucide-react";

export const IntroSection = () => {
  const controls = useAnimationControls();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center mb-4 space-y-4 relative w-full max-w-screen-lg mx-auto px-4 pt-12"
    >
      {/* Animated Value Scene */}
      <motion.div 
        className="relative h-24 mb-4"
        whileInView={{ scale: [0.9, 1] }}
        transition={{ duration: 0.5 }}
      >
        {/* Value indicators */}
        <motion.div
          className="absolute left-[30%] top-0"
          animate={{
            y: [-5, 5, -5],
            opacity: [0.4, 0.8, 0.4],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <PoundSterling className="w-4 h-4 text-green-400/50" />
        </motion.div>
        <motion.div
          className="absolute left-[45%] top-4"
          animate={{
            y: [5, -5, 5],
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <TrendingUp className="w-4 h-4 text-blue-400/50" />
        </motion.div>
        <motion.div
          className="absolute left-[60%] top-2"
          animate={{
            y: [-8, 8, -8],
            opacity: [0.4, 0.8, 0.4],
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChartBar className="w-4 h-4 text-purple-400/50" />
        </motion.div>

        {/* Centered value indicator */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.2,
            type: "spring",
            stiffness: 200,
          }}
        >
          <div className="relative">
            {/* Value glow effect */}
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 blur-lg rounded-full"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [0.98, 1.02, 0.98],
                rotate: [0, 180],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="relative"
              whileHover={{ 
                scale: 1.05,
                transition: { type: "spring", stiffness: 400 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <motion.div
                  className="flex items-center gap-1.5 bg-gradient-to-r from-green-500/20 to-blue-500/20 px-3 py-1.5 rounded-full"
                  animate={{
                    y: [-2, 2, -2],
                    scale: [1, 1.05, 1],
                  }}
                  whileHover={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    transition: { duration: 0.2 }
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <PoundSterling className="w-5 h-5 text-green-400" />
                  </motion.div>
                  <motion.span 
                    className="text-sm font-semibold text-white/70"
                    animate={{
                      opacity: [0.7, 1, 0.7],
                    }}
                    whileHover={{
                      color: "rgba(255,255,255,0.9)",
                      scale: 1.05
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    Value
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Animated market indicators */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `${i * 12 + 8}px`,
              left: `${40 + (i * 10)}%`,
            }}
            animate={{
              y: [-8, 8, -8],
              opacity: [0.3, 0.7, 0.3],
              rotate: [-5, 5, -5],
            }}
            whileHover={{
              scale: 1.2,
              opacity: 0.9
            }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <TrendingUp className="w-3 h-3 text-green-400/40" />
          </motion.div>
        ))}
      </motion.div>

      <div className="relative">
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-purple-500/5 blur-3xl"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
            scale: [1, 1.1, 1],
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
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 relative z-10 flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            type: "spring",
            stiffness: 100
          }}
        >
          <motion.div 
            className="text-white"
            whileHover={{
              scale: 1.02,
              transition: { type: "spring", stiffness: 400 }
            }}
          >
            Property Valuations
          </motion.div>
          <div className="relative inline-block">
            <motion.span 
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 pb-2"
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", stiffness: 400 }
              }}
            >
              with AI Magic
            </motion.span>
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
        </motion.h1>
      </div>
    </motion.div>
  );
};
