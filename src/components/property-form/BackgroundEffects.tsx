
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/layout/header/ThemeProvider";

export const BackgroundEffects = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <>
      <motion.div
        className={`absolute -inset-2 bg-gradient-to-r ${
          isDark 
            ? "from-[#8B5CF6] via-[#D946EF] to-[#0EA5E9] opacity-75" 
            : "from-[#6366F1] via-[#A78BFA] to-[#60A5FA] opacity-30"
        } blur-2xl rounded-lg`}
        animate={{
          scale: [1, 1.1, 1],
          opacity: isDark ? [0.5, 0.8, 0.5] : [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className={`absolute -inset-2 bg-gradient-to-r ${
          isDark 
            ? "from-[#F97316] via-[#8B5CF6] to-[#D946EF] opacity-75" 
            : "from-[#F59E0B] via-[#8B5CF6] to-[#EC4899] opacity-30"
        } blur-2xl rounded-lg`}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: isDark ? [0.5, 0.8, 0.5] : [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating particles with adjusted visibility for light/dark modes */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 6 + 3 + "px",
              height: Math.random() * 6 + 3 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              background: isDark 
                ? `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})` 
                : `rgba(100, 116, 139, ${Math.random() * 0.3 + 0.2})`,
              boxShadow: isDark 
                ? '0 0 4px rgba(255, 255, 255, 0.5)' 
                : '0 0 4px rgba(100, 116, 139, 0.3)',
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: isDark ? [0.4, 1, 0.4] : [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Large glowing orbs adjusted for light/dark modes */}
        <motion.div
          className={`absolute top-0 right-0 w-64 h-64 ${
            isDark ? "bg-purple-500/5" : "bg-purple-500/2"
          } rounded-full mix-blend-overlay filter blur-xl`}
          animate={{
            y: [0, 50, 0],
            x: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className={`absolute bottom-0 left-0 w-64 h-64 ${
            isDark ? "bg-blue-500/5" : "bg-blue-500/2"
          } rounded-full mix-blend-overlay filter blur-xl`}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Additional gradient orbs */}
        <motion.div
          className={`absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r ${
            isDark 
              ? "from-purple-500/10 to-pink-500/10" 
              : "from-purple-500/5 to-pink-500/5"
          } rounded-full mix-blend-overlay filter blur-xl`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: isDark ? [0.3, 0.6, 0.3] : [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className={`absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r ${
            isDark 
              ? "from-blue-500/10 to-teal-500/10" 
              : "from-blue-500/5 to-teal-500/5"
          } rounded-full mix-blend-overlay filter blur-xl`}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: isDark ? [0.4, 0.7, 0.4] : [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
    </>
  );
};
