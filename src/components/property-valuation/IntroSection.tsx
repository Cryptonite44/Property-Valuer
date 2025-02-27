
import React, { useState, useEffect } from "react";
import { motion, useAnimationControls, AnimatePresence } from "framer-motion";
import { RecentValuations } from "./AnimatedPropertyCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Home, Sparkles, CheckCircle2 } from "lucide-react";

export const IntroSection = () => {
  const controls = useAnimationControls();
  const [activeUsers, setActiveUsers] = useState(0);
  const [liveValueCount, setLiveValueCount] = useState(0);
  const [recentValuations, setRecentValuations] = useState<
    { address: string; time: string; id: number }[]
  >([]);

  // Simulate active users and valuations
  useEffect(() => {
    // Set initial values
    setActiveUsers(Math.floor(Math.random() * 10) + 15);
    setLiveValueCount(Math.floor(Math.random() * 50) + 120);

    // Update active users periodically
    const userInterval = setInterval(() => {
      setActiveUsers((prev) => {
        const change = Math.random() > 0.7 ? 1 : -1;
        return Math.max(12, Math.min(30, prev + change));
      });
    }, 5000);

    // Update valuations count
    const valuationInterval = setInterval(() => {
      setLiveValueCount((prev) => prev + 1);
      
      // Add a new valuation notification
      if (Math.random() > 0.6) {
        const addresses = [
          "Highfield Road, London",
          "Park Lane, Manchester",
          "Maple Drive, Birmingham",
          "Forest Avenue, Edinburgh",
          "Oak Street, Glasgow",
          "Cedar Lane, Bristol",
          "Willow Close, Cardiff",
          "Birch Road, Leeds",
          "Pine Street, Liverpool",
          "Elm Avenue, Newcastle"
        ];
        
        setRecentValuations((prev) => [
          {
            address: addresses[Math.floor(Math.random() * addresses.length)],
            time: "Just now",
            id: Date.now()
          },
          ...prev
        ].slice(0, 3)); // Keep only the 3 most recent
      }
    }, 3000);

    return () => {
      clearInterval(userInterval);
      clearInterval(valuationInterval);
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center mb-4 space-y-4 relative w-full max-w-screen-lg mx-auto px-4 pt-12"
    >
      {/* Live activity indicators */}
      <motion.div 
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Active users */}
        <motion.div 
          className="flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-purple-500/20"
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative mr-2">
            <Users className="w-4 h-4 text-purple-400" />
            <motion.div
              className="absolute -inset-1 rounded-full bg-purple-400/20"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </div>
          <div className="text-xs text-white/90 font-medium">
            <span className="text-purple-300">{activeUsers}</span> users online
          </div>
          
          {/* User avatars */}
          <div className="flex -space-x-2 ml-2">
            {[1, 2, 3].map((index) => (
              <Avatar key={index} className="w-5 h-5 border border-black/10">
                <AvatarImage src={`https://i.pravatar.cc/100?img=${10 + index}`} />
                <AvatarFallback className="text-[8px] bg-gradient-to-br from-purple-500/70 to-indigo-500/70 text-white">
                  {String.fromCharCode(64 + index)}
                </AvatarFallback>
              </Avatar>
            ))}
            {activeUsers > 3 && (
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500/70 to-purple-500/70 flex items-center justify-center text-[8px] text-white border border-black/10">
                +{activeUsers - 3}
              </div>
            )}
          </div>
        </motion.div>
        
        {/* Live valuations counter */}
        <motion.div 
          className="flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-blue-500/20"
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative mr-2">
            <Home className="w-4 h-4 text-blue-400" />
            <motion.div
              className="absolute -inset-1 rounded-full bg-blue-400/20"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.5
              }}
            />
          </div>
          <div className="text-xs text-white/90 font-medium">
            <span className="text-blue-300">{liveValueCount.toLocaleString()}</span> valuations generated
          </div>
        </motion.div>
        
        {/* Latest valuations */}
        <motion.div 
          className="hidden md:flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-green-500/20"
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative mr-2">
            <Sparkles className="w-4 h-4 text-green-400" />
            <motion.div
              className="absolute -inset-1 rounded-full bg-green-400/20"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1
              }}
            />
          </div>
          <div className="text-xs text-white/90 font-medium">
            Live valuations
          </div>
        </motion.div>
      </motion.div>
      
      {/* Live valuation notifications */}
      <div className="absolute left-4 sm:left-8 top-16 sm:top-20 z-10 w-56 max-w-[90%] flex flex-col gap-2">
        <AnimatePresence>
          {recentValuations.map((valuation) => (
            <motion.div
              key={valuation.id}
              className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg bg-white/5 backdrop-blur-sm border border-green-500/20 shadow-lg"
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                <motion.div
                  className="absolute -inset-1 rounded-full bg-green-400/20"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-white font-medium truncate max-w-[180px]">
                  {valuation.address}
                </span>
                <span className="text-[10px] text-green-300">{valuation.time}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="relative">
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-purple-500/5 blur-3xl"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
            scale: [1, 1.1, 1],
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
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 relative z-10 flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            type: "spring",
            stiffness: 100
          }}
        >
          <motion.div 
            className="text-white"
            whileHover={{
              scale: 1.02,
              transition: { type: "spring", stiffness: 400 }
            }}
          >
            Property Valuations
          </motion.div>
          <div className="relative inline-block">
            <motion.span 
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 pb-2"
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", stiffness: 400 }
              }}
            >
              with AI Magic
            </motion.span>
            <motion.div
              className="absolute -bottom-2 left-0 right-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.5
              }}
            >
              <svg
                width="100%"
                height="15"
                viewBox="0 0 200 15"
                fill="none"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M0 5C12 5 15 12 28 12S44 5 56 5 72 12 84 12 100 5 112 5s28 7 40 7S168 5 180 5s16 7 20 7"
                  stroke="url(#underline-gradient)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    duration: 1.5,
                    ease: [0.43, 0.13, 0.23, 0.96],
                    delay: 0.5
                  }}
                />
                <defs>
                  <linearGradient id="underline-gradient" x1="0" y1="0" x2="100%" y2="0">
                    <stop stopColor="#C084FC" offset="0%" />
                    <stop stopColor="#818CF8" offset="50%" />
                    <stop stopColor="#60A5FA" offset="100%" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </div>
        </motion.h1>
      </div>

      {/* Add the animated property cards as recent valuations */}
      <RecentValuations />

      {/* Background floating elements with varying sizes */}
      <motion.div
        className="absolute top-20 left-[15%] w-16 h-16 rounded-full bg-purple-500/5 hidden lg:block"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [-5, 5, -5],
          y: [-5, 5, -5],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-[15%] w-24 h-24 rounded-full bg-blue-500/5 hidden lg:block"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.3, 0.1],
          x: [5, -5, 5],
          y: [5, -5, 5],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      {/* Small floating elements */}
      <motion.div
        className="absolute top-[40%] left-[25%] w-8 h-8 rounded-full bg-indigo-500/5 hidden lg:block"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.3, 0.15],
          x: [-3, 3, -3],
          y: [-3, 3, -3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-[30%] right-[20%] w-12 h-12 rounded-full bg-green-500/5 hidden lg:block"
        animate={{
          scale: [1.1, 0.9, 1.1],
          opacity: [0.1, 0.25, 0.1],
          x: [3, -3, 3],
          y: [3, -3, 3],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
      {/* Tiny elements */}
      <motion.div
        className="absolute top-[60%] left-[10%] w-5 h-5 rounded-full bg-pink-500/5 hidden lg:block"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [-2, 2, -2],
          y: [-2, 2, -2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
      <motion.div
        className="absolute top-[20%] right-[30%] w-6 h-6 rounded-full bg-amber-500/5 hidden lg:block"
        animate={{
          scale: [0.9, 1.2, 0.9],
          opacity: [0.1, 0.2, 0.1],
          x: [2, -2, 2],
          y: [2, -2, 2],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />
    </motion.div>
  );
};
