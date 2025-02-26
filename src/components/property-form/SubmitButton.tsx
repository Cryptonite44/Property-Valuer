
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader, Brain, Building2, ChartLine } from "lucide-react";
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
      className="relative"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-[#9b87f5] via-[#8B5CF6] to-[#D6BCFA] opacity-75 blur-md rounded-lg"
        animate={{
          scale: [1, 1.02, 1],
          opacity: [0.7, 0.9, 0.7],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <Button 
        type="submit" 
        className={`w-full mt-8 relative overflow-hidden ${
          isLoading 
            ? 'bg-transparent' 
            : 'bg-gradient-to-r from-[#9b87f5] via-[#8B5CF6] to-[#D6BCFA] text-white'
        } font-medium hover:opacity-90 transition-all h-16`}
        disabled={isLoading}
      >
        {isLoading ? (
          <motion.div 
            className="flex flex-col items-center gap-3 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="relative">
              <motion.div className="flex items-center gap-6">
                <motion.div
                  animate={{
                    opacity: [0.4, 1, 0.4],
                    scale: [0.9, 1, 0.9],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 0,
                  }}
                >
                  <Building2 className="w-5 h-5 text-blue-400" />
                </motion.div>
                <motion.div
                  animate={{
                    opacity: [0.4, 1, 0.4],
                    scale: [0.9, 1, 0.9],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 0.6,
                  }}
                >
                  <Brain className="w-5 h-5 text-purple-400" />
                </motion.div>
                <motion.div
                  animate={{
                    opacity: [0.4, 1, 0.4],
                    scale: [0.9, 1, 0.9],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 1.2,
                  }}
                >
                  <ChartLine className="w-5 h-5 text-green-400" />
                </motion.div>
              </motion.div>
            </div>
            <div className="flex flex-col items-center text-sm">
              <motion.div
                className="relative"
              >
                <motion.span
                  className="inline-block text-white/90 font-medium"
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Analyzing Property Data
                </motion.span>
              </motion.div>
              <motion.div 
                className="flex space-x-1.5 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="relative flex items-center justify-center w-full"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-200%" }}
              animate={{ x: "200%" }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
                delay: 1,
              }}
            />
            
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg font-medium text-white relative z-10"
            >
              Get Estimate
            </motion.span>
          </motion.div>
        )}
      </Button>
    </motion.div>
  );
};
