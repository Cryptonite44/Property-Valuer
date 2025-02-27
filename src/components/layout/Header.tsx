
import React from "react";
import { motion } from "framer-motion";
import { Building2, Activity, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 w-full z-20 pb-2"
    >
      {/* Enhanced gradient background with increased opacity for more impact */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent backdrop-blur-md -z-10" />
      
      <div className="w-full">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 py-3 px-4">
          <Link to="/" className="glass-panel py-2 px-4 relative overflow-hidden w-full sm:w-auto flex-shrink-0 group">
            {/* Moving particles effect */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
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
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>
            
            {/* Enhanced gradient animation with higher saturation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-700/20 via-blue-600/20 to-pink-700/20"
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
            
            <div className="flex items-center justify-center sm:justify-start relative z-10 w-full">
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div 
                  className="p-2 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg flex items-center justify-center group-hover:border-white/50 transition-all duration-300"
                  style={{ minWidth: '36px', minHeight: '36px' }}
                  whileHover={{ 
                    boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)",
                  }}
                >
                  <Building2 className="w-5 h-5 text-white block group-hover:text-purple-200 transition-colors" strokeWidth={2} />
                </motion.div>
                
                <div className="flex flex-col ml-3">
                  <div className="flex items-center space-x-2">
                    <motion.span 
                      className="font-bold text-base tracking-tight text-white/90 group-hover:text-white transition-colors"
                      whileHover={{ scale: 1.03 }}
                    >
                      PropertyValuer
                    </motion.span>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    >
                      <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                    </motion.div>
                  </div>
                  <span className="text-xs font-medium text-gray-400 group-hover:text-gray-300 transition-colors">by Digitol</span>
                </div>
              </motion.div>
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
                className="absolute -inset-1 rounded-full bg-green-400/20"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
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
        </div>
      </div>
    </motion.div>
  );
};
