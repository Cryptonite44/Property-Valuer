
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
    >
      <Button 
        type="submit" 
        className={`w-full mt-8 relative overflow-hidden ${
          isLoading 
            ? 'bg-gradient-to-r from-black/40 via-blue-950/40 to-black/40' 
            : 'bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#FFE5B4] text-black'
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
              <motion.div
                className="absolute -inset-3 rounded-full blur-md bg-blue-400/30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
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
                  <Building2 className="w-5 h-5 text-blue-300" />
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
                  <Brain className="w-5 h-5 text-purple-300" />
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
                  <ChartLine className="w-5 h-5 text-green-300" />
                </motion.div>
              </motion.div>
            </div>
            <div className="flex flex-col items-center text-sm">
              <motion.div
                className="relative"
              >
                <motion.span
                  className="inline-block"
                  animate={{
                    opacity: [0.5, 1, 0.5],
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
                    className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
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
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 text-base"
          >
            Get Estimate
          </motion.span>
        )}
      </Button>
    </motion.div>
  );
};
