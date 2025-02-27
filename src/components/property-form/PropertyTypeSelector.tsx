
import React from "react";
import { Building2, Home, MapPin, Store, TreeDeciduous } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";

export const PropertyTypeIcons = [
  { 
    type: 'house', 
    icon: <Home className="w-7 h-7" />, 
    label: 'House', 
    color: 'from-blue-500/20 to-blue-600/20', 
    gradient: 'bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-blue-600/10',
    border: 'border-blue-500/20',
    shadowColor: 'shadow-blue-500/10'
  },
  { 
    type: 'apartment', 
    icon: <Building2 className="w-7 h-7" />, 
    label: 'Apartment', 
    color: 'from-purple-500/20 to-purple-600/20', 
    gradient: 'bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-purple-600/10',
    border: 'border-purple-500/20',
    shadowColor: 'shadow-purple-500/10'
  },
  { 
    type: 'land', 
    icon: <TreeDeciduous className="w-7 h-7" />, 
    label: 'Land', 
    color: 'from-green-500/20 to-green-600/20', 
    gradient: 'bg-gradient-to-br from-green-500/10 via-green-400/5 to-green-600/10',
    border: 'border-green-500/20',
    shadowColor: 'shadow-green-500/10'
  },
  { 
    type: 'commercial', 
    icon: <Store className="w-7 h-7" />, 
    label: 'Commercial', 
    color: 'from-amber-500/20 to-amber-600/20', 
    gradient: 'bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-amber-600/10',
    border: 'border-amber-500/20',
    shadowColor: 'shadow-amber-500/10'
  },
];

interface PropertyTypeSelectorProps {
  selectedType: string;
  onTypeSelect: (type: string) => void;
}

export const PropertyTypeSelector = ({ selectedType, onTypeSelect }: PropertyTypeSelectorProps) => {
  return (
    <motion.div 
      className="w-full mb-4 relative"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
    >
      {/* Horizontal scroll container for mobile */}
      <div className="flex overflow-x-auto gap-3 pb-2 hide-scrollbar sm:grid sm:grid-cols-4 sm:overflow-visible">
        {PropertyTypeIcons.map(({ type, icon, label, color, gradient, border, shadowColor }, index) => (
          <Tooltip key={type}>
            <TooltipTrigger asChild>
              <motion.button
                type="button"
                onClick={() => onTypeSelect(type)}
                className={`relative p-4 rounded-xl text-center transition-all overflow-hidden flex flex-col items-center justify-center min-w-[110px] sm:min-w-0 flex-shrink-0 sm:flex-shrink-1
                  ${selectedType === type
                    ? `bg-white/10 ${border} shadow-lg ${shadowColor}`
                    : 'bg-white/5 hover:bg-white/10 border border-transparent'
                  }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.3 + index * 0.1,
                  y: { type: "spring", stiffness: 300, damping: 20 },
                  opacity: { duration: 0.3 }
                }}
              >
                <div className={`absolute inset-0 ${gradient} opacity-70`} />
                
                {selectedType === type && (
                  <motion.div 
                    className="absolute inset-0 opacity-30"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0.2, 0.4, 0.2],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${color}`} />
                  </motion.div>
                )}
                
                <div className="relative z-10 flex flex-col items-center">
                  <motion.div 
                    className={`flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 mb-2 sm:mb-3 rounded-full 
                      ${selectedType === type ? 'bg-white/10' : 'bg-white/5'} 
                      backdrop-blur-md`}
                    animate={selectedType === type ? {
                      scale: [1, 1.05, 1],
                      transition: {
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }
                    } : {}}
                  >
                    <div className={`text-xl sm:text-2xl ${selectedType === type ? 'text-white' : 'text-white/70'}`}>
                      {icon}
                    </div>
                  </motion.div>
                  <span className={`text-xs sm:text-sm font-medium ${selectedType === type ? 'text-white' : 'text-white/70'}`}>
                    {label}
                  </span>
                </div>
                
                {/* Decorative dots */}
                {selectedType === type && (
                  <>
                    <motion.div
                      className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-white/40"
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                    <motion.div
                      className="absolute bottom-2 left-2 w-1 h-1 rounded-full bg-white/30"
                      animate={{
                        opacity: [0.2, 0.5, 0.2],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 0.5,
                      }}
                    />
                  </>
                )}
              </motion.button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Select for {label.toLowerCase()} valuation</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      {/* Add subtle fade indicators to show scrollable content on mobile */}
      <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-[#0A0118] to-transparent pointer-events-none sm:hidden"></div>
    </motion.div>
  );
};
