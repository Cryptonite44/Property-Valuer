
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader, Brain, Building2, ChartLine, Search, Sparkles, Stars } from "lucide-react";
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
      <Button 
        type="submit" 
        className={`w-full mt-8 relative overflow-hidden ${
          isLoading 
            ? 'bg-gradient-to-r from-[#0F0322] via-[#1E0A40] to-[#170732] text-white' 
            : 'bg-gradient-to-r from-[#9b87f5] via-[#8B5CF6] to-[#D6BCFA] text-white'
        } font-medium hover:opacity-90 transition-all h-16`}
        disabled={isLoading}
      >
        {isLoading ? (
          <motion.div 
            className="flex flex-col items-center gap-3 text-white absolute inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Magical background effects */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Particle effects */}
              {[...Array(25)].map((_, i) => (
                <motion.div 
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: Math.random() * 3 + 1,
                    height: Math.random() * 3 + 1,
                    filter: `blur(${Math.random() * 1}px)`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.5 + 0.3,
                  }}
                  animate={{
                    y: [0, -(Math.random() * 50 + 20)],
                    x: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20],
                    opacity: [0.5, 0],
                    scale: [1, Math.random() * 0.5 + 0.5],
                  }}
                  transition={{
                    duration: Math.random() * 2 + 1,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 0.5,
                  }}
                />
              ))}
              
              {/* Magical glow effects */}
              <motion.div
                className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <div className="absolute inset-0 bg-gradient-radial from-purple-500/30 via-indigo-600/15 to-transparent rounded-full blur-xl" />
              </motion.div>
            </div>

            <div className="relative flex flex-col items-center justify-center h-full w-full gap-1">
              <div className="mt-1">
                {/* Magical animated icons */}
                <motion.div className="flex items-center gap-6">
                  <motion.div className="relative flex items-center justify-center">
                    <motion.div
                      animate={{
                        opacity: [0.4, 1, 0.4],
                        scale: [0.9, 1, 0.9],
                        rotate: [0, 5, 0],
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
                      className="absolute inset-0 bg-blue-400/30 rounded-full blur-md -z-10"
                      animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0, 0.3, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0,
                      }}
                    />
                  </motion.div>

                  <motion.div className="relative flex items-center justify-center">
                    <motion.div
                      animate={{
                        opacity: [0.4, 1, 0.4],
                        scale: [0.9, 1, 0.9],
                        rotate: [0, -5, 0],
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
                      className="absolute inset-0 bg-purple-400/30 rounded-full blur-md -z-10"
                      animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0, 0.3, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0.6,
                      }}
                    />
                    {/* Magic sparkles around the brain */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        initial={{ 
                          x: 0, 
                          y: 0, 
                          scale: 0,
                          opacity: 0
                        }}
                        animate={{
                          x: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 30],
                          y: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 30],
                          scale: [0, 0.7, 0],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: Math.random() * 2 + 0.5,
                          delay: Math.random() * 1 + 0.5,
                        }}
                      >
                        <Sparkles className="text-purple-200" size={Math.random() * 8 + 6} />
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div className="relative flex items-center justify-center">
                    <motion.div
                      animate={{
                        opacity: [0.4, 1, 0.4],
                        scale: [0.9, 1, 0.9],
                        rotate: [0, 5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 1.2,
                      }}
                    >
                      <ChartLine className="w-5 h-5 text-green-400" />
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 bg-green-400/30 rounded-full blur-md -z-10"
                      animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0, 0.3, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 1.2,
                      }}
                    />
                  </motion.div>
                </motion.div>
              </div>

              <div className="flex flex-col items-center text-sm mt-1">
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
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: 1,
                        textShadow: [
                          "0 0 5px rgba(255, 255, 255, 0.2)",
                          "0 0 10px rgba(255, 255, 255, 0.4)",
                          "0 0 5px rgba(255, 255, 255, 0.2)"
                        ]
                      }}
                      transition={{
                        opacity: { duration: 0.5 },
                        textShadow: { duration: 2, repeat: Infinity }
                      }}
                    >
                      Analyzing Property Data
                    </motion.span>
                  </motion.span>
                </motion.div>
                
                {/* Magical loading indicator with sparkles */}
                <motion.div 
                  className="flex space-x-1.5 mt-2 relative"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {[0, 1, 2].map((index) => (
                    <motion.div
                      key={index}
                      className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                        boxShadow: [
                          "0 0 2px rgba(168, 85, 247, 0.2)",
                          "0 0 4px rgba(168, 85, 247, 0.6)",
                          "0 0 2px rgba(168, 85, 247, 0.2)"
                        ]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                    />
                  ))}
                  
                  <motion.div
                    className="absolute -right-7 -top-3"
                    animate={{
                      rotate: [0, 20, 0],
                      y: [0, -3, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-yellow-300/80" />
                    
                    {/* Sparkles glow */}
                    <motion.div
                      className="absolute inset-0 bg-yellow-300/30 rounded-full blur-sm -z-10"
                      animate={{
                        scale: [1, 2, 1],
                        opacity: [0.1, 0.3, 0.1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="relative flex items-center justify-center w-full gap-2"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {/* Magical idle state - sparkling effects */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Random sparkles */}
              {[...Array(7)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{ 
                    x: `${Math.random() * 100}%`, 
                    y: `${Math.random() * 100}%`,
                    scale: 0,
                    opacity: 0 
                  }}
                  animate={{
                    scale: [0, 0.7, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                    repeatDelay: Math.random() * 7 + 3,
                  }}
                >
                  <Sparkles 
                    size={Math.random() * 8 + 10} 
                    className="text-purple-200" 
                  />
                </motion.div>
              ))}
              
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "easeInOut",
                  delay: 1,
                  repeatDelay: 7
                }}
              />
            </div>
            
            {/* Magical pulsing glow behind the search icon */}
            <div className="relative">
              <motion.div 
                className="absolute inset-0 bg-white rounded-full blur-md -z-10"
                animate={{
                  scale: [0.8, 1.5, 0.8],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <Search className="w-5 h-5" />
            </div>
            
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg font-medium text-white relative z-10"
            >
              Get Estimate
            </motion.span>
            
            {/* Trailing sparkle animation */}
            <motion.div 
              className="absolute right-6 top-1/2 -translate-y-1/2"
              animate={{
                y: [0, -15, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 4,
                delay: 2
              }}
            >
              <Sparkles size={14} className="text-yellow-200" />
            </motion.div>
          </motion.div>
        )}
      </Button>
    </motion.div>
  );
};
