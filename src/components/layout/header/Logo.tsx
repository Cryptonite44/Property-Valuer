
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const Logo = () => {
  const [hoverLogo, setHoverLogo] = useState(false);

  return (
    <Link 
      to="/" 
      className="glass-panel py-2 px-5 relative overflow-hidden w-full sm:w-auto flex-shrink-0 group hover:bg-white/5 transition-colors duration-300"
      onMouseEnter={() => setHoverLogo(true)}
      onMouseLeave={() => setHoverLogo(false)}
    >
      {/* More subtle background effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-700/5 via-blue-600/10 to-purple-700/5 opacity-70"
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
      
      {/* Enhanced glow effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-indigo-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
      
      <div className="flex items-center justify-center sm:justify-start relative z-10 w-full">
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
                <span className="font-bold text-base sm:text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-white group-hover:from-white group-hover:via-purple-200 group-hover:to-white transition-all duration-500">
                  PropertyValuer
                </span>
              </div>
              <Sparkles className="h-4 w-4 text-purple-300" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
