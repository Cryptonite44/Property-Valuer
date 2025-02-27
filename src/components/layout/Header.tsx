
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Activity, Sparkles, Star, Zap, Flame } from "lucide-react";
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
      className="sticky top-0 w-full z-20 pb-2"
    >
      {/* Dramatic aurora-like background effect */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-purple-900/20 to-transparent backdrop-blur-lg"
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
        
        {/* Dynamic animated light beams */}
        <motion.div
          className="absolute -top-[200px] -left-[100px] w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/10 via-violet-500/5 to-transparent blur-3xl"
          animate={{
            x: [0, 30],
            opacity: [0.3, 0.5],
            scale: [1, 1.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute -bottom-[200px] -right-[100px] w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent blur-3xl"
          animate={{
            x: [0, -30],
            opacity: [0.2, 0.4],
            scale: [1, 1.1],
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
                opacity: [0, 0.7, 0],
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
      
      <div className="w-full">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 py-3 px-4">
          <Link 
            to="/" 
            className="glass-panel py-2 px-4 relative overflow-hidden w-full sm:w-auto flex-shrink-0 group"
            onMouseEnter={() => setHoverLogo(true)}
            onMouseLeave={() => setHoverLogo(false)}
          >
            {/* Pulsing highlight effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-700/10 via-blue-600/20 to-pink-700/10 opacity-70"
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
            
            {/* Enhanced glow effect on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-blue-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{
                backgroundPosition: ["0% 0%", "100% 0%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "mirror",
              }}
              style={{
                backgroundSize: "200% 100%",
              }}
            />
            
            {/* Moving particles effect with more particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-purple-500/30"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${10 + Math.random() * 80}%`,
                  }}
                  animate={{
                    x: [0, Math.random() * 50 - 25],
                    y: [0, Math.random() * 30 - 15],
                    opacity: [0, 0.8, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
            
            <div className="flex items-center justify-center sm:justify-start relative z-10 w-full">
              <div className="flex items-center">
                <div 
                  className="p-2 rounded-xl bg-gradient-to-br from-purple-600/30 to-blue-600/30 backdrop-blur-sm border border-white/30 shadow-lg flex items-center justify-center group-hover:border-white/50 transition-all duration-300"
                  style={{ minWidth: '40px', minHeight: '40px' }}
                >
                  <Building2 className="w-6 h-6 text-white block group-hover:text-purple-200 transition-colors" strokeWidth={2} />
                </div>
                
                <div className="flex flex-col ml-3">
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <span className="font-bold text-base sm:text-lg tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-white group-hover:from-white group-hover:via-purple-200 group-hover:to-white transition-all duration-500">
                        PropertyValuer
                      </span>
                      {/* Removed the animated underline effect */}
                    </div>
                    <Sparkles className="h-4 w-4 text-purple-400" />
                  </div>
                  <span className="text-xs font-medium text-gray-400 group-hover:text-gray-300 transition-colors">
                    by Digitol
                  </span>
                </div>
              </div>
            </div>
          </Link>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="glass-panel py-1.5 px-3 flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start flex-shrink-0 hover:bg-white/10 transition-colors group cursor-pointer"
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <div className="relative">
              <Activity className="w-3.5 h-3.5 text-green-400 group-hover:text-green-300 transition-colors" />
              <motion.div
                className="absolute -inset-1.5 rounded-full bg-green-400/20"
                animate={{
                  scale: [1, 1.5],
                  opacity: [0, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </div>
            <motion.div
              className="flex items-center gap-1"
              initial={{ x: -5, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <span className="text-xs font-medium text-green-400 group-hover:text-green-300 transition-colors">All Systems Nominal</span>
              <Star className="w-3 h-3 text-amber-400" fill="#FCD34D" />
            </motion.div>
          </motion.div>
          
          {/* New action button with cool effects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="hidden sm:flex glass-panel py-1.5 px-3 items-center gap-2 justify-center flex-shrink-0 hover:bg-gradient-to-r hover:from-blue-900/30 hover:to-purple-900/30 transition-all duration-300 group cursor-pointer"
            whileHover={{ 
              scale: 1.03,
              transition: { 
                type: "spring",
                stiffness: 400,
                damping: 10
              }
            }}
          >
            <div className="relative">
              <Flame className="w-3.5 h-3.5 text-orange-400 group-hover:text-orange-300" />
              <motion.div
                className="absolute -inset-1 rounded-full bg-orange-400/20"
                animate={{
                  scale: [1, 1.3],
                  opacity: [0, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </div>
            <div className="relative">
              <span className="text-xs font-medium text-white/80 group-hover:text-white transition-colors">Pro Features</span>
              <motion.div
                className="absolute -right-2.5 -top-1.5 flex items-center justify-center w-3 h-3 rounded-full bg-purple-400/30"
                animate={{
                  scale: [1, 1.3],
                  opacity: [0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <Zap className="w-2 h-2 text-purple-200" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
