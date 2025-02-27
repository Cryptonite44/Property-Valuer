
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Activity, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  const [hoverLogo, setHoverLogo] = useState(false);
  
  // Random sparkle generation
  const [sparkles, setSparkles] = useState<{id: number, x: number, y: number, size: number}[]>([]);
  
  useEffect(() => {
    // Create sparkles periodically
    const interval = setInterval(() => {
      if (sparkles.length < 15) {
        setSparkles(prev => [
          ...prev, 
          {
            id: Date.now(),
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2
          }
        ]);
      }
    }, 500);
    
    // Clean up sparkles that have been around too long
    const cleanup = setInterval(() => {
      setSparkles(prev => {
        if (prev.length > 12) {
          return prev.slice(1);
        }
        return prev;
      });
    }, 2000);
    
    return () => {
      clearInterval(interval);
      clearInterval(cleanup);
    };
  }, [sparkles.length]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full z-20"
    >
      {/* Sophisticated blended gradient background */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-purple-900/30 to-purple-900/5" />
        
        {/* Dynamic flowing background effect */}
        <motion.div 
          className="absolute inset-0"
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
            background: "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.08), transparent 70%), radial-gradient(circle at 20% 70%, rgba(79, 70, 229, 0.08), transparent 70%)",
          }}
        />
        
        {/* Refined light effects */}
        <motion.div
          className="absolute -top-[400px] -left-[200px] w-[800px] h-[800px] rounded-full bg-gradient-to-r from-purple-500/5 via-violet-500/3 to-transparent blur-3xl"
          animate={{
            x: [0, 30],
            opacity: [0.2, 0.3],
            scale: [1, 1.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute -bottom-[300px] -right-[200px] w-[800px] h-[800px] rounded-full bg-gradient-to-r from-blue-500/5 via-indigo-500/3 to-transparent blur-3xl"
          animate={{
            x: [0, -30],
            opacity: [0.15, 0.25],
            scale: [1, 1.05],
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
      
      {/* Moving sparkles effect in the background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AnimatePresence>
          {sparkles.map(sparkle => (
            <motion.div
              key={sparkle.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`,
                width: `${sparkle.size}px`,
                height: `${sparkle.size}px`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.5, 0],
                scale: [0, 1, 0],
                y: [-0, -20],
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ 
                duration: 2,
                ease: "easeOut"
              }}
            />
          ))}
        </AnimatePresence>
      </div>
      
      {/* Glowing line effect replacing the harsh line */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
      
      <div className="w-full">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 pb-5 px-6">
          <Link 
            to="/" 
            className="relative overflow-hidden w-full sm:w-auto flex-shrink-0 group transition-all duration-300 rounded-xl backdrop-blur-sm"
            onMouseEnter={() => setHoverLogo(true)}
            onMouseLeave={() => setHoverLogo(false)}
          >
            {/* Sophisticated background effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-800/10 via-indigo-700/15 to-purple-800/10 rounded-xl border border-white/10"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            />
            
            {/* Enhanced hover interaction */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-indigo-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
              animate={{
                backgroundPosition: ["0% 0%", "100% 0%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "mirror",
              }}
              style={{
                backgroundSize: "200% 100%",
              }}
            />
            
            {/* Subtle light rays on hover */}
            <AnimatePresence>
              {hoverLogo && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-[1px] h-[70%] bg-gradient-to-b from-transparent via-purple-400/30 to-transparent"
                      style={{ 
                        left: '50%',
                        top: '15%',
                        transform: `translateX(-50%) rotate(${i * 30}deg)`,
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: [0, 0.7, 0],
                        scale: [0.8, 1.1, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="flex items-center justify-center sm:justify-start relative z-10 w-full py-3 px-4">
              <div className="flex items-center">
                <div 
                  className="p-2 rounded-xl bg-gradient-to-br from-purple-600/40 to-blue-600/40 backdrop-blur-sm border border-white/30 shadow-lg flex items-center justify-center group-hover:border-white/50 transition-all duration-300"
                  style={{ minWidth: '44px', minHeight: '44px' }}
                >
                  <Building2 className="w-7 h-7 text-white block group-hover:text-purple-100 transition-colors" strokeWidth={1.8} />
                </div>
                
                <div className="flex flex-col ml-4">
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <motion.span 
                        className="font-bold text-base sm:text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-white"
                        animate={{
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        style={{
                          backgroundSize: "200% auto",
                        }}
                      >
                        PropertyValuer
                      </motion.span>
                    </div>
                    <motion.div
                      initial={{ scale: 1 }}
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    >
                      <Sparkles className="h-4 w-4 text-purple-300" />
                    </motion.div>
                  </div>
                  <motion.span 
                    className="text-xs font-medium text-gray-300 group-hover:text-gray-200 transition-colors"
                    animate={{
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    by Digitol
                  </motion.span>
                </div>
              </div>
            </div>
          </Link>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative overflow-hidden rounded-xl backdrop-blur-sm py-2 px-4 flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start flex-shrink-0 transition-colors group cursor-pointer border border-white/10"
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            {/* Subtle background effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-green-800/10 via-emerald-700/15 to-green-800/10 -z-10 opacity-70"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            />
            
            <div className="relative">
              <Activity className="w-4 h-4 text-green-400 group-hover:text-green-300 transition-colors" />
              <motion.div
                className="absolute -inset-1.5 rounded-full bg-green-400/20"
                animate={{
                  scale: [1, 1.5],
                  opacity: [0, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </div>
            <motion.div
              className="flex items-center gap-1.5"
              initial={{ x: -5, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <span className="text-sm font-medium text-green-400 group-hover:text-green-300 transition-colors">All Systems Operational</span>
              <motion.div
                animate={{
                  rotate: [0, 10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1,
                }}
              >
                <Star className="w-3.5 h-3.5 text-amber-400" fill="#FCD34D" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
