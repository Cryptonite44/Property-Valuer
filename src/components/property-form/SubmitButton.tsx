
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader, Wand, Stars } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SubmitButtonProps {
  isLoading: boolean;
}

export const SubmitButton = ({ isLoading }: SubmitButtonProps) => {
  const [magicPosition, setMagicPosition] = useState({ x: 0, y: 0 });
  const [showStars, setShowStars] = useState(false);
  
  // Create the floating stars effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowStars(true);
      setTimeout(() => setShowStars(false), 1500);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Mouse follow effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isLoading) {
      const buttonRect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - buttonRect.left;
      const y = e.clientY - buttonRect.top;
      setMagicPosition({ x, y });
    }
  };

  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    setMagicPosition({ x: 0, y: 0 });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mt-8"
    >
      <div 
        className="relative w-full overflow-visible"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Magical circle that follows cursor */}
        {!isLoading && (
          <motion.div
            className="absolute pointer-events-none w-16 h-16 rounded-full bg-gradient-radial from-violet-300/30 to-transparent blur-md z-10"
            animate={{
              x: magicPosition.x - 32,
              y: magicPosition.y - 32,
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              x: { duration: 0.2, ease: "easeOut" },
              y: { duration: 0.2, ease: "easeOut" },
              opacity: { repeat: Infinity, duration: 2 },
              scale: { repeat: Infinity, duration: 2 },
            }}
          />
        )}
        
        {/* Constellation effect */}
        <div className="absolute -inset-10 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-indigo-200 rounded-full"
              style={{
                top: `${10 + Math.random() * 80}%`,
                left: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5,
                repeatDelay: Math.random() * 8,
              }}
            />
          ))}
          
          {/* Connection lines between stars (constellation effect) */}
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
            <motion.path
              d="M 20,20 L 80,40 L 40,80 L 20,20"
              strokeWidth="0.5"
              stroke="rgba(139, 92, 246, 0.5)"
              fill="none"
              strokeDasharray="100"
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: [100, 0, 100] }}
              transition={{ duration: 10, repeat: Infinity, repeatDelay: 5 }}
            />
            <motion.path
              d="M 50,10 L 90,50 L 60,90"
              strokeWidth="0.5"
              stroke="rgba(139, 92, 246, 0.5)"
              fill="none"
              strokeDasharray="100"
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: [100, 0, 100] }}
              transition={{ duration: 8, repeat: Infinity, delay: 2, repeatDelay: 4 }}
            />
          </svg>
        </div>
        
        {/* Main button */}
        <Button 
          type="submit" 
          variant={isLoading ? "default" : "magical"}
          size="xl"
          className={`w-full relative ${
            isLoading 
              ? 'bg-gradient-to-b from-[#170732] to-[#0F0322] text-white border border-indigo-900/30'
              : 'group'
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-3">
              {/* Rotating loader */}
              <div className="relative">
                <motion.div
                  className="w-6 h-6 rounded-full border-2 border-indigo-300/30 border-t-indigo-500"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-0 w-6 h-6 rounded-full border-2 border-transparent border-b-purple-500"
                  animate={{ rotate: -180 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              
              {/* Text with staggered reveal effect */}
              <div className="relative overflow-hidden h-6">
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [-24, 0, 0, -24] }}
                  transition={{ duration: 3, repeat: Infinity, times: [0, 0.2, 0.8, 1] }}
                  className="flex flex-col space-y-1 text-center"
                >
                  <span className="h-6 flex items-center text-indigo-200">Analyzing data...</span>
                  <span className="h-6 flex items-center text-indigo-200">Calculating values...</span>
                  <span className="h-6 flex items-center text-indigo-200">Finalizing estimate...</span>
                </motion.div>
              </div>
            </div>
          ) : (
            <div className="relative flex items-center justify-center gap-3 z-10 px-6">
              {/* Magic wand with glow effect */}
              <div className="relative">
                <motion.div
                  className="absolute -inset-2 bg-gradient-radial from-purple-400/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 blur-md"
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                <Wand className="text-white w-5 h-5" />
              </div>
              
              <span className="font-medium">Get Magical Estimate</span>
              
              {/* Floating star on hover */}
              <AnimatePresence>
                {showStars && (
                  <motion.div
                    className="absolute -top-8 right-10 text-yellow-200"
                    initial={{ opacity: 0, y: 10, scale: 0 }}
                    animate={{ opacity: 1, y: -10, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0 }}
                    transition={{ duration: 1.5 }}
                  >
                    <Stars className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Cosmic particles */}
          <div className="absolute inset-0 overflow-hidden rounded-md pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -Math.random() * 30 - 10],
                  x: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20],
                  opacity: [0, 0.7, 0],
                  scale: [0, Math.random() + 0.3, 0],
                }}
                transition={{
                  duration: Math.random() * 2 + 1,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </Button>
        
        {/* Magical aura around button */}
        <div className="absolute -inset-0.5 rounded-md bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20 blur-sm opacity-50 -z-10" />
        
        {/* Light beams shooting from the edges */}
        {!isLoading && (
          <>
            <motion.div 
              className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-0.5 h-10 bg-gradient-to-b from-transparent via-purple-500/40 to-purple-400/10 z-0"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: [0, 0.8, 0], scaleY: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 7 }}
            />
            <motion.div 
              className="absolute -right-10 top-1/2 transform -translate-y-1/2 h-0.5 w-10 bg-gradient-to-r from-purple-400/10 via-purple-500/40 to-transparent z-0"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: [0, 0.8, 0], scaleX: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 8, delay: 1 }}
            />
          </>
        )}
      </div>
      
      {/* Magical instruction text */}
      <motion.div 
        className="mt-2 text-xs text-center text-indigo-300/70 flex justify-center items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div 
          animate={{ rotate: [0, 5, 0, -5, 0] }} 
          transition={{ duration: 5, repeat: Infinity }}
        >
          ✨
        </motion.div>
        <span>Our AI analyzes thousands of properties for accuracy</span>
        <motion.div 
          animate={{ rotate: [0, -5, 0, 5, 0] }} 
          transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
        >
          ✨
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
