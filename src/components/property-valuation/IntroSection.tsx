
import React, { useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { RecentValuations } from "./AnimatedPropertyCard";
import { Sparkles, Star } from "lucide-react";

export const IntroSection = () => {
  const controls = useAnimationControls();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Initial animation sequence
    controls.start({
      scale: [0.9, 1.1, 1],
      transition: { duration: 1.2, ease: "easeInOut" }
    });
  }, [controls]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center mb-4 space-y-4 relative w-full max-w-screen-lg mx-auto px-4 pt-12"
    >
      {/* Cosmic background effects */}
      <motion.div 
        className="absolute inset-0 -z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Stellar background */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.2,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Cosmic nebulas */}
        <motion.div
          className="absolute -top-[50%] -left-[25%] w-[150%] h-[150%] rounded-full bg-gradient-to-r from-purple-800/5 via-indigo-700/10 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute -bottom-[50%] -right-[25%] w-[150%] h-[150%] rounded-full bg-gradient-to-r from-transparent via-blue-700/10 to-violet-800/5 blur-3xl"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, -5, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </motion.div>

      {/* Main title section with 3D perspective effects */}
      <div className="relative perspective-[1200px]">
        {/* Main title wrapper */}
        <motion.div
          className="relative z-10 pt-10 pb-6 px-4"
          initial={{ opacity: 0, rotateX: 25, y: 50 }}
          animate={{ 
            opacity: 1, 
            rotateX: [2, -2, 2],
            y: 0 
          }}
          transition={{
            opacity: { duration: 1 },
            rotateX: { 
              duration: 8, 
              repeat: Infinity, 
              repeatType: "reverse",
              ease: "easeInOut" 
            },
            y: { 
              duration: 1.5, 
              ease: [0.22, 1, 0.36, 1] 
            }
          }}
        >
          {/* Dramatic spotlight effect */}
          <motion.div
            className="absolute inset-0 -z-10 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.div 
              className="absolute -top-[100px] left-[50%] w-[300px] h-[600px] -translate-x-1/2 bg-gradient-to-b from-purple-600/30 via-indigo-600/15 to-transparent blur-[80px]"
              animate={{
                width: ["250px", "350px", "250px"],
                height: ["500px", "800px", "500px"],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Main title with advanced animation effects */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4 overflow-hidden flex flex-col items-center transform-gpu"
            animate={controls}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Upper word - "PROPERTY" - with splitting letter animations */}
            <div className="relative overflow-hidden mb-2">
              <motion.div
                className="flex justify-center items-center"
                initial={{ y: 80 }}
                animate={{ y: 0 }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.21, 1.11, 0.42, 0.98],
                  delay: 0.2,
                }}
              >
                {Array.from("PROPERTY").map((letter, index) => (
                  <motion.span
                    key={index}
                    className="inline-block relative"
                    initial={{ 
                      opacity: 0, 
                      y: 100, 
                      scale: 0.5,
                      filter: "blur(10px)"
                    }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      filter: "blur(0px)"
                    }}
                    transition={{
                      duration: 0.8,
                      delay: 0.05 * index + 0.3,
                      ease: [0.21, 1.11, 0.42, 0.98],
                    }}
                    whileHover={{
                      color: ["#fff", "#c4b5fd", "#fff"],
                      y: -10,
                      transition: { 
                        color: { duration: 0.8, repeat: Infinity },
                        y: { duration: 0.3, ease: "easeOut" }
                      }
                    }}
                  >
                    <span className="relative">
                      {letter}
                      
                      {/* Letter glow effect on hover */}
                      <motion.span
                        className="absolute inset-0 text-purple-300 blur-sm"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: [0, 0.8, 0] }}
                        transition={{
                          opacity: { duration: 1.5, repeat: Infinity }
                        }}
                      >
                        {letter}
                      </motion.span>
                    </span>
                  </motion.span>
                ))}
              </motion.div>
              
              {/* Dramatic swipe-in line */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[6px]"
                initial={{ scaleX: 0, transformOrigin: "left" }}
                animate={{ scaleX: [0, 1, 1, 0] }}
                transition={{
                  duration: 2.5,
                  times: [0, 0.4, 0.6, 1],
                  ease: ["easeInOut", "linear", "easeInOut"],
                  delay: 0.8,
                }}
              >
                <div className="w-full h-full bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
              </motion.div>
            </div>
            
            {/* Lower word - "VALUATIONS" - with wave animation */}
            <div className="relative overflow-hidden">
              <motion.div
                className="flex justify-center items-center"
                initial={{ y: 80 }}
                animate={{ y: 0 }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.21, 1.11, 0.42, 0.98],
                  delay: 0.4,
                }}
              >
                {Array.from("VALUATIONS").map((letter, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    initial={{ 
                      opacity: 0, 
                      y: 100,
                      rotateY: 75,
                      filter: "blur(10px)"
                    }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      rotateY: 0,
                      filter: "blur(0px)"
                    }}
                    transition={{
                      duration: 0.8,
                      delay: 0.05 * index + 0.6,
                      ease: [0.21, 1.11, 0.42, 0.98],
                    }}
                    whileHover={{
                      color: ["#fff", "#93c5fd", "#fff"],
                      scale: 1.2,
                      rotate: [-5, 5, 0],
                      transition: { 
                        color: { duration: 0.8, repeat: Infinity },
                        scale: { duration: 0.3 },
                        rotate: { duration: 0.5 }
                      }
                    }}
                  >
                    <span className="relative">
                      {letter}
                      
                      {/* Letter glow effect on hover */}
                      <motion.span
                        className="absolute inset-0 text-blue-300 blur-sm"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: [0, 0.8, 0] }}
                        transition={{
                          opacity: { duration: 1.5, repeat: Infinity }
                        }}
                      >
                        {letter}
                      </motion.span>
                    </span>
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.h1>

          {/* "with AI Magic" subtitle with special effects */}
          <motion.div
            className="relative mt-6 mb-2 transform-gpu perspective-[800px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {/* Glowing backdrop for the subtitle */}
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-purple-600/10 via-indigo-600/20 to-blue-600/10 rounded-lg blur-xl"
              animate={{
                opacity: [0.4, 0.7, 0.4],
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{
                opacity: { duration: 3, repeat: Infinity, repeatType: "reverse" },
                backgroundPosition: { duration: 8, repeat: Infinity, repeatType: "reverse" }
              }}
              style={{ backgroundSize: "200% 100%" }}
            />

            <div className="relative flex items-center justify-center">
              {/* Magical text effect */}
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  opacity: { duration: 0.8, delay: 1.2 },
                  y: { duration: 0.8, delay: 1.2 },
                  backgroundPosition: { duration: 6, repeat: Infinity, ease: "linear" }
                }}
                style={{ backgroundSize: "200% auto" }}
              >
                with AI Magic
              </motion.h2>
              
              {/* Animated sparkles icon */}
              <motion.div 
                className="ml-2 relative"
                initial={{ scale: 0, rotate: -30 }}
                animate={{ 
                  scale: [0, 1.2, 1],
                  rotate: [-30, 15, 0]
                }}
                transition={{
                  duration: 0.8,
                  delay: 1.5,
                  ease: "backOut"
                }}
                whileHover={{
                  rotate: [0, 15, -15, 10, -10, 0],
                  scale: [1, 1.2, 0.9, 1.1, 1],
                  transition: { duration: 1 }
                }}
              >
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-300" />
                
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 bg-yellow-300/50 rounded-full blur-md -z-10"
                  animate={{
                    scale: [1, 1.6, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                
                {/* Flying tiny stars */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    initial={{ 
                      x: 0, 
                      y: 0, 
                      scale: 0,
                      opacity: 0
                    }}
                    animate={{
                      x: [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 60],
                      y: [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 60],
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: Math.random() * 4 + 1
                    }}
                  >
                    <Star className="text-yellow-200" size={Math.random() * 10 + 4} fill="currentColor" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            {/* Animated underline */}
            <motion.div
              className="absolute -bottom-3 left-0 right-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 1.3
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
                  animate={{ 
                    pathLength: 1, 
                    opacity: 1,
                    filter: [
                      "drop-shadow(0 0 2px rgba(196, 132, 252, 0.2))",
                      "drop-shadow(0 0 8px rgba(196, 132, 252, 0.6))",
                      "drop-shadow(0 0 2px rgba(196, 132, 252, 0.2))"
                    ]
                  }}
                  transition={{
                    pathLength: { 
                      duration: 1.5,
                      ease: [0.43, 0.13, 0.23, 0.96],
                      delay: 1.3
                    },
                    filter: {
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: 2
                    }
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
          </motion.div>
        </motion.div>
        
        {/* Floating orbs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* Large purple orb */}
          <motion.div
            className="absolute top-[10%] -left-[5%] w-28 h-28 rounded-full bg-purple-500/20 blur-lg"
            animate={{
              x: [0, 20, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
          
          {/* Large blue orb */}
          <motion.div
            className="absolute bottom-[10%] -right-[5%] w-40 h-40 rounded-full bg-blue-500/15 blur-xl"
            animate={{
              x: [0, -30, 0],
              y: [0, 20, 0],
              scale: [1, 0.9, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 2,
            }}
          />
          
          {/* Medium indigo orb */}
          <motion.div
            className="absolute top-[40%] right-[15%] w-20 h-20 rounded-full bg-indigo-500/20 blur-lg"
            animate={{
              x: [0, -15, 0],
              y: [0, 25, 0],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 1,
            }}
          />
          
          {/* Small violet orb */}
          <motion.div
            className="absolute top-[20%] right-[25%] w-12 h-12 rounded-full bg-violet-500/25 blur-md"
            animate={{
              x: [0, 20, 0],
              y: [0, 15, 0],
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 3,
            }}
          />
          
          {/* Small teal orb */}
          <motion.div
            className="absolute bottom-[30%] left-[20%] w-16 h-16 rounded-full bg-teal-500/15 blur-lg"
            animate={{
              x: [0, 25, 0],
              y: [0, -10, 0],
              scale: [1, 0.8, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 4,
            }}
          />
          
          {/* Tiny pink orb */}
          <motion.div
            className="absolute top-[70%] left-[30%] w-8 h-8 rounded-full bg-pink-500/20 blur-sm"
            animate={{
              x: [0, -15, 0],
              y: [0, -20, 0],
              scale: [1, 1.4, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>
      </div>

      {/* Recent valuations */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <RecentValuations />
      </motion.div>
    </motion.div>
  );
};
