import React from "react";
import { motion } from "framer-motion";
import TypewriterText from "@/components/TypewriterText";
import { Home, PoundSterling, TrendingUp, ChartBar } from "lucide-react";

export const IntroSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center mb-8 space-y-6 relative w-full max-w-screen-lg mx-auto px-4 pt-20"
    >
      {/* Animated House Scene */}
      <div className="relative h-32 mb-8">
        {/* Value indicators */}
        <motion.div
          className="absolute left-1/4 top-0"
          animate={{
            y: [-5, 5, -5],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <PoundSterling className="w-6 h-6 text-green-400/50" />
        </motion.div>
        <motion.div
          className="absolute right-1/3 top-4"
          animate={{
            y: [5, -5, 5],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <TrendingUp className="w-6 h-6 text-blue-400/50" />
        </motion.div>
        <motion.div
          className="absolute right-1/4 top-2"
          animate={{
            y: [-8, 8, -8],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChartBar className="w-6 h-6 text-purple-400/50" />
        </motion.div>

        {/* House with value indicator */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative">
            {/* Value glow effect */}
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 blur-xl rounded-full"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [0.98, 1.02, 0.98],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative">
                <Home className="w-16 h-16 text-white" strokeWidth={1.5} />
                {/* Value indicator */}
                <motion.div
                  className="absolute -top-4 -right-2 flex items-center gap-1 bg-gradient-to-r from-green-500/20 to-blue-500/20 px-2 py-1 rounded-full"
                  animate={{
                    y: [-2, 2, -2],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <PoundSterling className="w-3 h-3 text-green-400" />
                  <motion.span 
                    className="text-xs font-semibold text-white/70"
                    animate={{
                      opacity: [0.7, 1, 0.7],
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
              top: `${i * 15 + 10}px`,
              left: `${i * 20 + 65}%`,
            }}
            animate={{
              y: [-8, 8, -8],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <TrendingUp className="w-4 h-4 text-green-400/40" />
          </motion.div>
        ))}
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
              className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                duration: 1.5,
                ease: [0.43, 0.13, 0.23, 0.96],
                delay: 0.5
              }}
            />
          </div>
        </h1>
      </div>
    </motion.div>
  );
};
