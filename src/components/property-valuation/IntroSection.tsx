
import React from "react";
import { motion, useAnimationControls } from "framer-motion";
import { RecentValuations } from "./AnimatedPropertyCard";

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
          className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 via-blue-500/20 to-purple-500/10 blur-3xl"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
            scale: [1, 1.2, 1],
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

        {/* Title with enhanced animation and visual appeal */}
        <motion.h1 
          className="relative z-10 flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            type: "spring",
            stiffness: 100
          }}
        >
          {/* First part of the title with staggered letter animation */}
          <motion.div className="overflow-hidden py-2 px-1 relative">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight">
              {Array.from("Property Valuations").map((letter, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  initial={{ 
                    y: 100, 
                    opacity: 0, 
                    rotateX: -90,
                    filter: "blur(10px)"
                  }}
                  animate={{ 
                    y: 0, 
                    opacity: 1, 
                    rotateX: 0,
                    filter: "blur(0px)"
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.03 * index,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{
                    scale: 1.2,
                    color: "#9b87f5",
                    transition: { duration: 0.2 }
                  }}
                >
                  {letter === " " ? (
                    <span>&nbsp;</span>
                  ) : (
                    <span className="text-white">{letter}</span>
                  )}
                </motion.span>
              ))}
            </div>
            
            {/* Enhanced background effect for the text */}
            <motion.div
              className="absolute -inset-1 rounded-lg -z-10"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                background: [
                  "radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.3), transparent 70%)",
                  "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.4), transparent 70%)",
                  "radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.3), transparent 70%)"
                ]
              }}
              transition={{
                opacity: { duration: 3, repeat: Infinity, repeatType: "reverse" },
                background: { duration: 8, repeat: Infinity, repeatType: "reverse" }
              }}
            />
          </motion.div>

          {/* Subtitle with enhanced visual effects */}
          <div className="relative inline-block">
            {/* Animated gradient text */}
            <motion.span 
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 pb-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold"
              initial={{ 
                opacity: 0, 
                y: 20,
                backgroundPosition: "0% 50%"
              }}
              animate={{ 
                opacity: 1, 
                y: 0,
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{
                opacity: { duration: 0.8, delay: 0.8 },
                y: { duration: 0.8, delay: 0.8 },
                backgroundPosition: { 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "easeInOut"
                }
              }}
              style={{ 
                backgroundSize: "200% auto"
              }}
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", stiffness: 400 }
              }}
            >
              with AI Magic
            </motion.span>

            {/* Enhanced animated underline */}
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
                  animate={{ 
                    pathLength: 1, 
                    opacity: 1,
                    filter: [
                      "drop-shadow(0 0 2px rgba(196, 132, 252, 0.2))",
                      "drop-shadow(0 0 6px rgba(196, 132, 252, 0.5))",
                      "drop-shadow(0 0 2px rgba(196, 132, 252, 0.2))"
                    ]
                  }}
                  transition={{
                    pathLength: { 
                      duration: 1.5,
                      ease: [0.43, 0.13, 0.23, 0.96],
                      delay: 0.5
                    },
                    filter: {
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: 1.5
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
          </div>
        </motion.h1>

        {/* Enhanced 3D effect for the title */}
        <motion.div
          className="absolute -inset-10 -z-10 opacity-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 0.5, 
            scale: 1,
            background: [
              "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15), transparent 70%)",
              "radial-gradient(circle at 50% 50%, rgba(96, 165, 250, 0.15), transparent 70%)",
              "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15), transparent 70%)"
            ]
          }}
          transition={{
            opacity: { duration: 1.5 },
            scale: { duration: 1.5 },
            background: { duration: 8, repeat: Infinity, repeatType: "reverse" }
          }}
        />
      </div>

      {/* Add the animated property cards as recent valuations */}
      <RecentValuations />

      {/* Enhanced floating elements with varying sizes and animations */}
      <motion.div
        className="absolute top-20 left-[15%] w-16 h-16 rounded-full bg-purple-500/10 hidden lg:block"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.5, 0.2],
          x: [-5, 5, -5],
          y: [-5, 5, -5],
          boxShadow: [
            "0 0 10px rgba(139, 92, 246, 0.3)",
            "0 0 20px rgba(139, 92, 246, 0.5)",
            "0 0 10px rgba(139, 92, 246, 0.3)"
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-[15%] w-24 h-24 rounded-full bg-blue-500/10 hidden lg:block"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.3, 0.1],
          x: [5, -5, 5],
          y: [5, -5, 5],
          boxShadow: [
            "0 0 10px rgba(96, 165, 250, 0.2)",
            "0 0 20px rgba(96, 165, 250, 0.4)",
            "0 0 10px rgba(96, 165, 250, 0.2)"
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      {/* Enhanced small floating elements */}
      <motion.div
        className="absolute top-[40%] left-[25%] w-8 h-8 rounded-full bg-indigo-500/10 hidden lg:block"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.4, 0.15],
          x: [-3, 3, -3],
          y: [-3, 3, -3],
          boxShadow: [
            "0 0 5px rgba(99, 102, 241, 0.2)",
            "0 0 10px rgba(99, 102, 241, 0.4)",
            "0 0 5px rgba(99, 102, 241, 0.2)"
          ]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-[30%] right-[20%] w-12 h-12 rounded-full bg-green-500/10 hidden lg:block"
        animate={{
          scale: [1.1, 0.9, 1.1],
          opacity: [0.1, 0.3, 0.1],
          x: [3, -3, 3],
          y: [3, -3, 3],
          boxShadow: [
            "0 0 5px rgba(34, 197, 94, 0.2)",
            "0 0 10px rgba(34, 197, 94, 0.3)",
            "0 0 5px rgba(34, 197, 94, 0.2)"
          ]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
      {/* Enhanced tiny elements */}
      <motion.div
        className="absolute top-[60%] left-[10%] w-5 h-5 rounded-full bg-pink-500/10 hidden lg:block"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.1, 0.3, 0.1],
          x: [-2, 2, -2],
          y: [-2, 2, -2],
          boxShadow: [
            "0 0 5px rgba(236, 72, 153, 0.2)",
            "0 0 10px rgba(236, 72, 153, 0.3)",
            "0 0 5px rgba(236, 72, 153, 0.2)"
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
      <motion.div
        className="absolute top-[20%] right-[30%] w-6 h-6 rounded-full bg-amber-500/10 hidden lg:block"
        animate={{
          scale: [0.9, 1.2, 0.9],
          opacity: [0.1, 0.3, 0.1],
          x: [2, -2, 2],
          y: [2, -2, 2],
          boxShadow: [
            "0 0 5px rgba(245, 158, 11, 0.2)",
            "0 0 10px rgba(245, 158, 11, 0.3)",
            "0 0 5px rgba(245, 158, 11, 0.2)"
          ]
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
