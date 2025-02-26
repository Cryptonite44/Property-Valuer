
import React from "react";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 w-full z-20 pb-2"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent backdrop-blur-sm -z-10" />
      <div className="w-full">
        <div className="flex items-center justify-center py-3">
          <Link to="/" className="glass-panel py-2 px-4 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10"
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
            
            <div className="flex items-center relative z-10">
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.02 }}
              >
                <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
                  <Building2 className="w-5 h-5 text-[#9b87f5]" />
                </div>
                <div className="flex items-center space-x-2 ml-3">
                  <span className="font-semibold text-base tracking-tight text-white/90">PropertyValuer</span>
                  <span className="text-xs font-medium text-gray-400">by Digitol</span>
                </div>
              </motion.div>
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
