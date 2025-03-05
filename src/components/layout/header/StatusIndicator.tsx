
import React from "react";
import { motion } from "framer-motion";
import { Activity, Star } from "lucide-react";

export const StatusIndicator = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="glass-panel py-2 px-4 flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start flex-shrink-0 hover:bg-white/5 transition-colors group cursor-pointer"
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
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
        <Star className="w-3.5 h-3.5 text-amber-400" fill="#FCD34D" />
      </motion.div>
    </motion.div>
  );
};
