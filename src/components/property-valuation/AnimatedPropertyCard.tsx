
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Bed, Bath, Square } from "lucide-react";

export const AnimatedPropertyCard = () => {
  return (
    <motion.div
      className="absolute bottom-10 right-10 z-10 hidden md:block"
      initial={{ opacity: 0, y: 50, rotate: 5 }}
      animate={{ 
        opacity: [0, 1],
        y: [50, 0],
        rotate: [-2, 2, -1],
      }}
      transition={{
        duration: 1,
        delay: 0.5,
        rotate: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 8,
        }
      }}
      whileHover={{ 
        scale: 1.05,
        rotate: 0,
        transition: { 
          duration: 0.3,
          type: "spring",
          stiffness: 300
        }
      }}
      drag
      dragConstraints={{
        top: -100,
        right: 100,
        bottom: 100,
        left: -100,
      }}
      dragElastic={0.1}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
    >
      <Card className="w-72 overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-xl">
        <div className="relative h-40 overflow-hidden">
          <motion.img 
            src="/lovable-uploads/b92ee8ba-9ee7-4da4-b844-bdf1acb3185a.png" 
            alt="Property" 
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute top-3 left-3 bg-purple-500 text-white text-sm font-medium px-2 py-1 rounded-full">
            Featured
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl font-bold text-purple-400">£1,250,000</span>
            <motion.div 
              className="text-xs rounded-full bg-green-500/20 text-green-400 px-2 py-0.5"
              animate={{
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              New
            </motion.div>
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Riverside Manor</h3>
          <p className="text-sm text-white/70 flex items-center mb-3">
            <motion.div
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Home className="w-3 h-3 mr-1 inline text-white/50" />
            </motion.div>
            Chelsea, London
          </p>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="flex flex-col items-center">
              <Bed className="w-4 h-4 text-white/50 mb-1" />
              <span className="text-xs text-white/70">4 Beds</span>
            </div>
            <div className="flex flex-col items-center">
              <Bath className="w-4 h-4 text-white/50 mb-1" />
              <span className="text-xs text-white/70">3 Baths</span>
            </div>
            <div className="flex flex-col items-center">
              <Square className="w-4 h-4 text-white/50 mb-1" />
              <span className="text-xs text-white/70">2,400 sq ft</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Floating dots */}
      <motion.div 
        className="absolute -top-5 -right-5 w-4 h-4 rounded-full bg-purple-500/50"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute -bottom-3 -left-3 w-3 h-3 rounded-full bg-blue-500/50"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </motion.div>
  );
};
