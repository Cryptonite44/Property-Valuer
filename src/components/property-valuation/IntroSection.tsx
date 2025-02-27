
import React, { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { RecentValuations } from "./AnimatedPropertyCard";
import { Sparkles, Star } from "lucide-react";

export const IntroSection = () => {
  const controls = useAnimationControls();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timeout = setTimeout(() => {
      controls.start({
        opacity: 1,
        scale: [1.2, 1],
        y: 0,
        transition: {
          duration: 0.8,
          type: "spring",
          stiffness: 100
        }
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [controls]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center mb-4 space-y-4 relative w-full max-w-screen-lg mx-auto px-4 pt-12"
    >
      <div className="relative px-4 py-16 sm:py-24 overflow-hidden">
        {/* Massive pulsing spotlight backdrop */}
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.4, 0.6, 0.4],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[200%] h-full bg-gradient-radial from-violet-500/20 via-purple-900/10 to-transparent rounded-full blur-3xl" />
        </motion.div>
        
        {/* Animated glow ring */}
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <motion.div
            className="w-[110%] h-[110%] rounded-full bg-gradient-to-r from-purple-700/10 via-violet-600/5 to-indigo-700/10 blur-3xl"
            animate={{ 
              rotate: 360,
              scale: [0.8, 1, 0.8]
            }}
            transition={{ 
              rotate: {
                duration: 30,
                repeat: Infinity,
                ease: "linear"
              },
              scale: {
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            }}
          />
        </div>
        
        {/* Background rays */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 h-[60vh] origin-bottom"
              style={{ 
                width: '3px',
                background: `linear-gradient(to top, transparent, ${i % 2 === 0 ? 'rgba(168, 85, 247, 0.2)' : 'rgba(99, 102, 241, 0.15)'})`,
                rotate: `${i * 45}deg`
              }}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ 
                opacity: [0.7, 0.3, 0.7],
                scaleY: [0.6, 0.8, 0.6]
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        {/* Floating particles in 3D space */}
        <div className="absolute inset-0 overflow-hidden opacity-70 -z-10">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${
                i % 5 === 0 ? 'bg-purple-400' : 
                i % 5 === 1 ? 'bg-blue-400' : 
                i % 5 === 2 ? 'bg-indigo-400' :
                i % 5 === 3 ? 'bg-pink-400' : 'bg-violet-400'
              }`}
              style={{
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                boxShadow: `0 0 ${Math.random() * 15 + 5}px ${
                  i % 5 === 0 ? 'rgba(168, 85, 247, 0.6)' : 
                  i % 5 === 1 ? 'rgba(96, 165, 250, 0.6)' : 
                  i % 5 === 2 ? 'rgba(99, 102, 241, 0.6)' :
                  i % 5 === 3 ? 'rgba(244, 114, 182, 0.6)' : 'rgba(139, 92, 246, 0.6)'
                }`,
                filter: `blur(${Math.random() * 1}px)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                zIndex: Math.floor(Math.random() * 10) - 5,
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
                x: [0, (Math.random() - 0.5) * 100],
                y: [0, (Math.random() - 0.5) * 100],
                z: [0, Math.random() * 50],
              }}
              transition={{
                duration: Math.random() * 8 + 5,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        {/* Main title with dramatic 3D perspective and hover-responsive animations */}
        <div className="perspective-[1200px] overflow-hidden relative">
          <motion.div
            className="flex flex-col items-center mb-6 md:mb-10 relative z-10 transform-gpu"
            initial={{ opacity: 0, y: 40, rotateX: 30 }}
            animate={{
              opacity: 1,
              y: 0,
              rotateX: [5, 0, 5],
              z: [0, 50, 0]
            }}
            transition={{
              duration: 2,
              rotateX: {
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            }}
          >
            {/* Top part of title */}
            <div className="relative group perspective">
              <motion.div
                className="absolute -inset-8 bg-gradient-radial from-purple-500/30 via-violet-600/10 to-transparent rounded-full blur-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                  scale: [0.9, 1.1, 0.9],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-700/20 via-purple-700/20 to-violet-700/20 rounded-3xl blur-xl"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  x: [-5, 5, -5]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              
              <motion.h1
                className="relative text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[0.8] md:leading-[0.9] py-4 px-6"
                initial={{ scale: 0.9 }}
                animate={{ 
                  scale: 1,
                  textShadow: [
                    "0 0 10px rgba(139, 92, 246, 0.5), 0 0 30px rgba(139, 92, 246, 0.3)", 
                    "0 0 20px rgba(139, 92, 246, 0.7), 0 0 40px rgba(139, 92, 246, 0.4)",
                    "0 0 10px rgba(139, 92, 246, 0.5), 0 0 30px rgba(139, 92, 246, 0.3)"
                  ]
                }}
                transition={{
                  textShadow: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.3 }
                }}
              >
                PROPERTY
                <br />
                VALUATIONS
              </motion.h1>
              
              {/* Animated border underneath */}
              <motion.div
                className="absolute bottom-0 left-[10%] right-[10%] h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ 
                  scaleX: 1, 
                  opacity: 1,
                  x: [-20, 20, -20]
                }}
                transition={{
                  scaleX: { duration: 1, delay: 0.5 },
                  opacity: { duration: 0.5, delay: 0.5 },
                  x: { duration: 8, repeat: Infinity, repeatType: "reverse" }
                }}
              />
              
              {/* Floating orbs near title */}
              <motion.div
                className="absolute -top-4 -right-2 md:top-0 md:right-0 w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-purple-400 to-violet-500 opacity-70 blur-sm"
                animate={{
                  y: [-5, 5, -5],
                  x: [5, -5, 5],
                  scale: [0.9, 1.1, 0.9]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              
              <motion.div
                className="absolute -bottom-2 -left-4 md:bottom-0 md:left-0 w-6 h-6 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 opacity-70 blur-sm"
                animate={{
                  y: [5, -5, 5],
                  x: [-5, 5, -5],
                  scale: [1.1, 0.9, 1.1]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1
                }}
              />
            </div>
          
            {/* "with AI Magic" subtitle with extra effects */}
            <motion.div
              className="relative mt-4 md:mt-6 px-10 transform-gpu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                rotateX: [-2, 2, -2]
              }}
              transition={{
                delay: 0.8,
                rotateX: {
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }}
            >
              {/* Shine effect backing */}
              <motion.div
                className="absolute -inset-3 rounded-xl bg-gradient-to-r from-purple-500/10 via-blue-500/20 to-purple-500/10 blur-xl"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  backgroundSize: "200% 100%"
                }}
              />
              
              <div className="flex items-center justify-center">
                {/* Animated 3D text with shimmer effect */}
                <motion.h2
                  className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-violet-400 to-blue-300 pb-1 animate-text-shine"
                  animate={{
                    backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    backgroundSize: "200% 100%"
                  }}
                  whileHover={{
                    scale: 1.05,
                    transition: { 
                      duration: 0.3,
                      type: "spring", 
                      stiffness: 300 
                    }
                  }}
                >
                  with AI Magic
                </motion.h2>
                
                {/* Enhanced sparkles icon with dynamic glow */}
                <motion.div
                  className="relative ml-1 sm:ml-3"
                  initial={{ rotate: 0 }}
                  animate={{
                    y: [-3, 3, -3],
                    rotate: [-5, 15, -5],
                    scale: [0.9, 1.1, 0.9]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-yellow-300" />
                  
                  {/* Multiple layers of glow effects */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-yellow-400/40 blur-md -z-10"
                    animate={{
                      scale: [1, 1.8, 1],
                      opacity: [0.4, 0.7, 0.4]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  
                  <motion.div
                    className="absolute inset-0 -z-20 rounded-full bg-yellow-300/20 blur-xl"
                    animate={{
                      scale: [1.2, 2.2, 1.2],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 0.5
                    }}
                  />
                  
                  {/* Tiny stars bursting */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-1/2"
                      initial={{ 
                        x: 0, 
                        y: 0, 
                        scale: 0,
                        opacity: 0
                      }}
                      animate={{
                        x: [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 50],
                        y: [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 50],
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: Math.random() * 5 + 2
                      }}
                    >
                      <Star className="text-yellow-200" size={Math.random() * 8 + 4} fill="currentColor" />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Mobile-specific subtitle with enhanced styling */}
          <motion.div 
            className="w-full max-w-xs mx-auto mt-4 sm:mt-0 mb-6 sm:hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <motion.div 
              className="h-1 w-28 bg-gradient-to-r from-purple-500/70 via-indigo-500/70 to-blue-500/70 rounded-full mx-auto mb-6"
              animate={{
                width: ["40%", "70%", "40%"],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.p 
              className="text-white/90 text-sm font-medium"
              animate={{
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              Get instant property valuations powered by advanced AI algorithms
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Recent valuations with enhanced entrance animations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <RecentValuations />
      </motion.div>
    </motion.div>
  );
};
