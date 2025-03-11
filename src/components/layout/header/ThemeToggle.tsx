
import React from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.button
      onClick={toggleTheme}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="glass-panel py-2 px-4 flex items-center gap-2 justify-center hover:bg-white/10 transition-colors"
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-300" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-600" />
      )}
      <span className="text-sm font-medium">
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </span>
    </motion.button>
  );
};
