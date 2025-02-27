
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Bed, Bath, Square } from "lucide-react";

interface AnimatedPropertyCardProps {
  position: {
    bottom?: string;
    top?: string;
    left?: string;
    right?: string;
  };
  price: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  size: string;
  delay: number;
  isFeatured?: boolean;
  isNew?: boolean;
  rotateDirection?: 1 | -1;
  imgSrc: string;
}

export const AnimatedPropertyCard: React.FC<AnimatedPropertyCardProps> = ({
  position,
  price,
  address,
  bedrooms,
  bathrooms,
  size,
  delay,
  isFeatured = false,
  isNew = false,
  rotateDirection = 1,
  imgSrc,
}) => {
  return (
    <motion.div
      className="absolute z-10 hidden md:block"
      style={position}
      initial={{ opacity: 0, y: 20, rotate: rotateDirection * 5 }}
      animate={{ 
        opacity: [0, 0.8],
        y: [20, 0],
        rotate: [rotateDirection * 2, rotateDirection * -2, rotateDirection * 1],
      }}
      transition={{
        duration: 1,
        delay: delay,
        rotate: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 8 + Math.random() * 4,
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
        top: -50,
        right: 50,
        bottom: 50,
        left: -50,
      }}
      dragElastic={0.1}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
    >
      <Card className="w-48 overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-xl">
        <div className="relative h-24 overflow-hidden">
          <motion.img 
            src={imgSrc}
            alt="Property" 
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          {isFeatured && (
            <div className="absolute top-2 left-2 bg-purple-500 text-white text-xs font-medium px-1.5 py-0.5 rounded-full">
              Instant Valuation
            </div>
          )}
        </div>
        <CardContent className="p-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-bold text-purple-400">{price}</span>
            {isNew && (
              <motion.div 
                className="text-[10px] rounded-full bg-green-500/20 text-green-400 px-1.5 py-0.5"
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
            )}
          </div>
          <h3 className="text-xs font-semibold text-white mb-1 truncate">{address}</h3>
          <div className="grid grid-cols-3 gap-1 text-center">
            <div className="flex flex-col items-center">
              <Bed className="w-3 h-3 text-white/50 mb-0.5" />
              <span className="text-[10px] text-white/70">{bedrooms}</span>
            </div>
            <div className="flex flex-col items-center">
              <Bath className="w-3 h-3 text-white/50 mb-0.5" />
              <span className="text-[10px] text-white/70">{bathrooms}</span>
            </div>
            <div className="flex flex-col items-center">
              <Square className="w-3 h-3 text-white/50 mb-0.5" />
              <span className="text-[10px] text-white/70">{size}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Floating dots */}
      <motion.div 
        className="absolute -top-2 -right-2 w-2 h-2 rounded-full bg-purple-500/50"
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
        className="absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full bg-blue-500/50"
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

export const RecentValuations = () => {
  const recentProperties = [
    {
      price: "£290,000",
      address: "Riverside House, Amersham",
      bedrooms: 4,
      bathrooms: 3,
      size: "2,400 ft²",
      position: { top: "70%", right: "8%" },
      delay: 0.3,
      isFeatured: true,
      isNew: false,
      rotateDirection: 1 as const,
      imgSrc: "/lovable-uploads/fa0d9c4f-855d-4893-99fd-30a6f7544366.png"
    },
    {
      price: "£420,000",
      address: "Maple Lane, Surrey",
      bedrooms: 2,
      bathrooms: 1,
      size: "850 ft²",
      position: { top: "190%", left: "8%" },
      delay: 0.5,
      isFeatured: true,
      isNew: false,
      rotateDirection: -1 as const,
      imgSrc: "/lovable-uploads/5bda7107-c273-4b16-be60-1da69b59b36f.png"
    }
  ];

  return (
    <>
      {recentProperties.map((property, index) => (
        <AnimatedPropertyCard key={index} {...property} />
      ))}
    </>
  );
};
