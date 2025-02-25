
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { motion } from "framer-motion";

interface SubmitButtonProps {
  isLoading: boolean;
}

export const SubmitButton = ({ isLoading }: SubmitButtonProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <Button 
        type="submit" 
        className={`w-full mt-8 relative overflow-hidden ${
          isLoading 
            ? 'bg-white/10' 
            : 'bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#FFE5B4] text-black'
        } font-medium hover:opacity-90 transition-all h-14`}
        disabled={isLoading}
      >
        {isLoading ? (
          <motion.div 
            className="flex flex-col items-center gap-2 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-1 rounded-full blur-sm bg-blue-400/30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <Loader className="w-5 h-5 animate-spin relative z-10" />
            </div>
            <div className="flex flex-col items-center text-sm">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Analyzing Property Data
              </motion.span>
              <motion.div 
                className="flex space-x-1 mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="w-1 h-1 rounded-full bg-blue-400"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: 0,
                  }}
                />
                <motion.div
                  className="w-1 h-1 rounded-full bg-blue-400"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: 0.2,
                  }}
                />
                <motion.div
                  className="w-1 h-1 rounded-full bg-blue-400"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: 0.4,
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10"
          >
            Get Estimate
          </motion.span>
        )}
      </Button>
    </motion.div>
  );
};
