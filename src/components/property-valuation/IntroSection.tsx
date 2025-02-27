
import React from "react";
import { motion, useAnimationControls } from "framer-motion";
import { RecentValuations } from "./AnimatedPropertyCard";
import { Sparkles } from "lucide-react";

export const IntroSection = () => {
  const controls = useAnimationControls();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center mb-4 space-y-4 relative w-full max-w-screen-lg mx-auto px-4 pt-12"
    >
      <div className="relative">
        {/* Enhanced background glow effect */}
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-purple-600/10 via-blue-600/15 to-purple-600/10 rounded-3xl blur-3xl"
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
          className="relative z-10 flex flex-col items-center gap-4 md:gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            type: "spring",
            stiffness: 100
          }}
        >
          {/* First part of title with highlight effect */}
          <div className="relative">
            <motion.div
              className="absolute -inset-1 opacity-70 rounded-lg blur-xl bg-gradient-to-r from-purple-600/20 via-blue-500/20 to-indigo-600/20"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            />
            <motion.div 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white relative inline-block px-4 py-2"
              whileHover={{
                scale: 1.02,
                transition: { type: "spring", stiffness: 400 }
              }}
            >
              Property Valuations
            </motion.div>
          </div>
          
          {/* Second part of title with more dramatic effect */}
          <div className="relative">
            {/* Dramatic lighting effect */}
            <motion.div
              className="absolute -inset-8 bg-gradient-to-r from-purple-600/10 via-indigo-600/15 to-blue-600/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            
            <div className="relative flex items-center justify-center">
              <motion.span 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 inline-block"
                whileHover={{
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 400 }
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "mirror",
                }}
                style={{
                  backgroundSize: "200% 100%",
                }}
              >
                with AI Magic
              </motion.span>
              
              {/* Floating Sparkles icon */}
              <motion.div
                className="ml-2 relative"
                animate={{
                  y: [0, -5, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-purple-300" />
                
                {/* Glow effect behind sparkles */}
                <motion.div 
                  className="absolute inset-0 rounded-full bg-purple-500/20 blur-md -z-10"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </motion.div>
            </div>
            
            {/* Colorful particles floating around */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute rounded-full ${
                  i % 3 === 0 ? 'bg-purple-400/60' : i % 3 === 1 ? 'bg-blue-400/60' : 'bg-indigo-400/60'
                }`}
                style={{
                  width: 4 + (i % 3) * 2,
                  height: 4 + (i % 3) * 2,
                  top: `${20 + (i * 10)}%`,
                  left: `${10 + (i * 15)}%`,
                }}
                animate={{
                  y: [0, -15, 0],
                  x: [0, i % 2 === 0 ? 10 : -10, 0],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.h1>
      </div>

      {/* Mobile-specific enhancements */}
      <motion.div 
        className="sm:hidden w-full max-w-xs mx-auto -mt-2 mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="h-1 w-20 bg-gradient-to-r from-purple-500/50 to-blue-500/50 rounded-full mx-auto mb-6"></div>
        <p className="text-white/80 text-sm">
          Get instant property valuations powered by advanced AI algorithms
        </p>
      </motion.div>

      {/* Add the animated property cards as recent valuations */}
      <RecentValuations />

      {/* Background floating elements with varying sizes */}
      <motion.div
        className="absolute top-20 left-[15%] w-16 h-16 rounded-full bg-purple-500/5 hidden lg:block"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [-5, 5, -5],
          y: [-5, 5, -5],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-[15%] w-24 h-24 rounded-full bg-blue-500/5 hidden lg:block"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.3, 0.1],
          x: [5, -5, 5],
          y: [5, -5, 5],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      {/* Small floating elements */}
      <motion.div
        className="absolute top-[40%] left-[25%] w-8 h-8 rounded-full bg-indigo-500/5 hidden lg:block"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.3, 0.15],
          x: [-3, 3, -3],
          y: [-3, 3, -3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-[30%] right-[20%] w-12 h-12 rounded-full bg-green-500/5 hidden lg:block"
        animate={{
          scale: [1.1, 0.9, 1.1],
          opacity: [0.1, 0.25, 0.1],
          x: [3, -3, 3],
          y: [3, -3, 3],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
      {/* Tiny elements */}
      <motion.div
        className="absolute top-[60%] left-[10%] w-5 h-5 rounded-full bg-pink-500/5 hidden lg:block"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [-2, 2, -2],
          y: [-2, 2, -2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
      <motion.div
        className="absolute top-[20%] right-[30%] w-6 h-6 rounded-full bg-amber-500/5 hidden lg:block"
        animate={{
          scale: [0.9, 1.2, 0.9],
          opacity: [0.1, 0.2, 0.1],
          x: [2, -2, 2],
          y: [2, -2, 2],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />
    </motion.div>
  );
};
