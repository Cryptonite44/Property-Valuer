
import React from "react";
import { motion } from "framer-motion";
import {
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const FormHeader = () => {
  return (
    <CardHeader className="text-center px-6 pt-8 pb-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-10"
      >
        <motion.div 
          className="absolute -inset-4 bg-gradient-to-r from-[#1e3a8a]/30 to-[#1e40af]/30 blur-xl"
          animate={{
            opacity: [0.5, 0.7, 0.5],
            scale: [0.98, 1.02, 0.98],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <CardTitle className="text-xl font-semibold text-white mb-2 relative">
          <motion.span
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Enter Property Details
          </motion.span>
        </CardTitle>
      </motion.div>
    </CardHeader>
  );
};
