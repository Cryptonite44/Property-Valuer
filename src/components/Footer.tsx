
import React from "react";
import { motion } from "framer-motion";
import { Building2, Copyright, Globe } from "lucide-react";

export const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-20"
    >
      <div className="bg-gradient-to-t from-[#1A1F2C] to-transparent pt-16">
        <div className="bg-[#1A1F2C]/95 backdrop-blur-lg border-t border-white/5">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
              >
                <Building2 className="w-5 h-5 text-[#9b87f5]" />
                <span className="text-white/90 font-medium">PropertyValuer</span>
              </motion.div>
              
              <div className="flex items-center gap-6">
                <motion.div 
                  className="flex items-center gap-2 text-sm text-white/60"
                  whileHover={{ scale: 1.02 }}
                >
                  <Globe className="w-4 h-4 text-[#7E69AB]" />
                  <span>www.digitol.co.uk</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2 text-sm text-white/60"
                  whileHover={{ scale: 1.02 }}
                >
                  <Copyright className="w-4 h-4 text-[#7E69AB]" />
                  <span>All Rights Reserved 2025 - Digitol</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
