
import React, { useState, useEffect } from "react";
import { motion, useAnimationControls, AnimatePresence } from "framer-motion";
import { RecentValuations } from "./AnimatedPropertyCard";
import { CheckCircle2 } from "lucide-react";

export const IntroSection = () => {
  const controls = useAnimationControls();
  const [liveValueCount, setLiveValueCount] = useState(0);
  const [recentValuations, setRecentValuations] = useState<
    { address: string; time: string; id: number; index: number }[]
  >([
    // Initialize with placeholder items to prevent layout jumps
    {
      address: "Canterbury, Kent",
      time: "Just now",
      id: 1,
      index: 0
    },
    {
      address: "Brighton, Sussex",
      time: "Just now",
      id: 2,
      index: 1
    },
    {
      address: "Guildford, Surrey",
      time: "Just now",
      id: 3,
      index: 2
    }
  ]);

  // Simulate valuations
  useEffect(() => {
    // Set initial values
    setLiveValueCount(Math.floor(Math.random() * 50) + 120);

    // Update valuations count
    const valuationInterval = setInterval(() => {
      setLiveValueCount((prev) => prev + 1);
      
      // South East UK locations
      const southEastLocations = [
        // Kent
        "Canterbury, Kent",
        "Maidstone, Kent",
        "Tunbridge Wells, Kent",
        "Dover, Kent",
        "Folkestone, Kent",
        "Whitstable, Kent",
        "Margate, Kent",
        "Ashford, Kent",
        "Sevenoaks, Kent",
        "Rochester, Kent",
        // Sussex
        "Brighton, Sussex",
        "Eastbourne, Sussex",
        "Hastings, Sussex",
        "Chichester, Sussex",
        "Worthing, Sussex",
        "Crawley, Sussex",
        "Horsham, Sussex",
        "Bexhill-on-Sea, Sussex",
        "Lewes, Sussex",
        "Arundel, Sussex",
        // Surrey
        "Guildford, Surrey",
        "Woking, Surrey",
        "Farnham, Surrey",
        "Epsom, Surrey",
        "Redhill, Surrey",
        "Reigate, Surrey",
        "Dorking, Surrey",
        "Camberley, Surrey",
        "Esher, Surrey",
        "Leatherhead, Surrey",
        // Hampshire
        "Southampton, Hampshire",
        "Portsmouth, Hampshire",
        "Winchester, Hampshire",
        "Basingstoke, Hampshire",
        "Eastleigh, Hampshire",
        "Fareham, Hampshire",
        "Andover, Hampshire",
        "Aldershot, Hampshire",
        "Fleet, Hampshire",
        "Farnborough, Hampshire",
        // Berkshire
        "Reading, Berkshire",
        "Windsor, Berkshire",
        "Maidenhead, Berkshire",
        "Bracknell, Berkshire",
        "Wokingham, Berkshire",
        "Newbury, Berkshire",
        "Ascot, Berkshire",
        "Slough, Berkshire",
        "Sandhurst, Berkshire",
        "Thatcham, Berkshire",
      ];
      
      // Replace a random card (using index 0, 1, or 2)
      const indexToUpdate = Math.floor(Math.random() * 3);
      
      setRecentValuations(prev => {
        const newValuations = [...prev];
        newValuations[indexToUpdate] = {
          address: southEastLocations[Math.floor(Math.random() * southEastLocations.length)],
          time: "Just now",
          id: Date.now(),
          index: indexToUpdate
        };
        return newValuations;
      });
    }, 3000);

    return () => {
      clearInterval(valuationInterval);
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center mb-4 space-y-4 relative w-full max-w-screen-lg mx-auto px-4 pt-6"
    >
      {/* Live valuation notifications - always in a row */}
      <motion.div 
        className="flex flex-row flex-wrap justify-center items-center gap-1.5 sm:gap-3 mb-4 sm:mb-6 relative z-20"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {recentValuations.map((valuation) => (
          <motion.div
            key={valuation.id}
            className="w-[31%] sm:w-auto sm:max-w-[32%] transform-gpu"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div 
              className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-lg bg-white/5 backdrop-blur-sm border border-green-500/20 shadow-lg hover:border-green-500/40 transition-colors duration-300"
            >
              <div className="relative flex-shrink-0">
                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-400" />
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
              <div className="flex flex-col items-start text-left flex-1 min-w-0 overflow-hidden">
                <span className="text-xs sm:text-xs text-white font-medium truncate w-full leading-tight">
                  {valuation.address}
                </span>
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-green-400"></div>
                  <span className="text-[8px] sm:text-[10px] text-green-300 whitespace-nowrap">{valuation.time}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
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
        
        {/* New integrated title with more cohesive design - removed Sparkles icon */}
        <div className="relative z-10">
          <motion.div 
            className="inline-flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              type: "spring",
              stiffness: 100
            }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 inline-block">
              Smart Property
            </h1>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white">
              Valuations
            </h1>
          </motion.div>
          
          {/* Subtitle with AI reference - updated text */}
          <motion.p
            className="text-sm sm:text-base text-white/80 mt-2 sm:mt-3 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">AI-powered</span> insights in seconds
          </motion.p>
          
          {/* Fancy underline effect */}
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 rounded-full mx-auto mt-4"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 96, opacity: 1 }}
            transition={{
              delay: 0.8,
              duration: 0.6,
              ease: "easeOut"
            }}
          />
        </div>
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
