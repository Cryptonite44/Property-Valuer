
import React from "react";
import { motion } from "framer-motion";
import { Logo } from "./header/Logo";
import { StatusIndicator } from "./header/StatusIndicator";
import { BackgroundEffects } from "./header/BackgroundEffects";
import { ThemeToggle } from "./header/ThemeToggle";

export const Header = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 w-full z-20 pb-2"
    >
      <BackgroundEffects />
      
      <div className="w-full">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 py-3 px-6">
          <Logo />
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <ThemeToggle />
            <StatusIndicator />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
