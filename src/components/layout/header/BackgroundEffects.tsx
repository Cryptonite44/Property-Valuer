
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export const BackgroundEffects = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
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
    <>
      {/* Refined gradient background for light/dark mode */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div 
          className={`absolute inset-0 ${
            isDark 
              ? "bg-gradient-to-b from-black/90 via-purple-900/20 to-transparent" 
              : "bg-gradient-to-b from-white/90 via-indigo-50/30 to-transparent"
          } backdrop-blur-lg`}
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
        
        {/* More subtle light effects adjusted for theme */}
        <motion.div
          className={`absolute -top-[200px] -left-[100px] w-[500px] h-[500px] rounded-full ${
            isDark
              ? "bg-gradient-to-r from-purple-500/10 via-violet-500/5 to-transparent"
              : "bg-gradient-to-r from-indigo-300/20 via-purple-200/15 to-transparent"
          } blur-3xl`}
          animate={{
            x: [0, 30],
            opacity: isDark ? [0.3, 0.4] : [0.3, 0.4],
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
          className={`absolute -bottom-[200px] -right-[100px] w-[500px] h-[500px] rounded-full ${
            isDark
              ? "bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent"
              : "bg-gradient-to-r from-blue-300/20 via-indigo-200/15 to-transparent"
          } blur-3xl`}
          animate={{
            x: [0, -30],
            opacity: isDark ? [0.2, 0.3] : [0.2, 0.3],
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
      
      {/* Moving sparkles effect in the background - adjusted for theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AnimatePresence>
          {sparkles.map(sparkle => (
            <motion.div
              key={sparkle.id}
              className={`absolute rounded-full ${isDark ? "bg-white" : "bg-indigo-500"}`}
              style={{
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`,
                width: `${sparkle.size}px`,
                height: `${sparkle.size}px`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: isDark ? [0, 0.5, 0] : [0, 0.3, 0],
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
    </>
  );
};
