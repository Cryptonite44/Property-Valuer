
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
    icon: <Home className="w-4 h-4 sm:w-5 sm:h-5" />, 
    label: 'House', 
    color: 'from-blue-500/20 to-blue-600/20', 
    gradient: 'bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-blue-600/10',
    border: 'border-blue-500/20',
    shadowColor: 'shadow-blue-500/10',
    hoverColor: 'group-hover:text-blue-400'
  },
  { 
    type: 'apartment', 
    icon: <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />, 
    label: 'Apartment', 
    color: 'from-purple-500/20 to-purple-600/20', 
    gradient: 'bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-purple-600/10',
    border: 'border-purple-500/20',
    shadowColor: 'shadow-purple-500/10',
    hoverColor: 'group-hover:text-purple-400'
  },
  { 
    type: 'land', 
    icon: <TreeDeciduous className="w-4 h-4 sm:w-5 sm:h-5" />, 
    label: 'Land', 
    color: 'from-green-500/20 to-green-600/20', 
    gradient: 'bg-gradient-to-br from-green-500/10 via-green-400/5 to-green-600/10',
    border: 'border-green-500/20',
    shadowColor: 'shadow-green-500/10',
    hoverColor: 'group-hover:text-green-400'
  },
  { 
    type: 'commercial', 
    icon: <Store className="w-4 h-4 sm:w-5 sm:h-5" />, 
    label: 'Commercial', 
    color: 'from-amber-500/20 to-amber-600/20', 
    gradient: 'bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-amber-600/10',
    border: 'border-amber-500/20',
    shadowColor: 'shadow-amber-500/10',
    hoverColor: 'group-hover:text-amber-400'
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
      <div className="bg-white/5 p-1.5 rounded-xl border border-white/10">
        <div className="flex items-center justify-between gap-1">
          {PropertyTypeIcons.map(({ type, icon, label, color, gradient, border, shadowColor, hoverColor }, index) => (
            <Tooltip key={type} delayDuration={300}>
              <TooltipTrigger asChild>
                <motion.button
                  type="button"
                  onClick={() => onTypeSelect(type)}
                  className={`group relative py-2 px-2 sm:px-3 rounded-lg text-center transition-all flex flex-col items-center justify-center w-full
                    ${selectedType === type
                      ? `${border} bg-white/10 ${shadowColor}`
                      : 'hover:bg-white/5 border border-transparent'
                    }`}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.3 + index * 0.05,
                    y: { type: "spring", stiffness: 300, damping: 20 },
                    opacity: { duration: 0.3 }
                  }}
                >
                  {selectedType === type && (
                    <motion.div 
                      className="absolute inset-0 rounded-lg opacity-30"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: [0.2, 0.3, 0.2],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${color}`} />
                    </motion.div>
                  )}
                  
                  <div className="relative z-10 flex flex-col items-center">
                    <div className={`text-sm sm:text-base ${selectedType === type ? 'text-white' : `text-white/70 ${hoverColor}`}`}>
                      {icon}
                    </div>
                    <span className={`text-[10px] sm:text-xs mt-1 font-medium ${selectedType === type ? 'text-white' : `text-white/70 ${hoverColor}`}`}>
                      {label}
                    </span>
                  </div>
                  
                  {selectedType === type && (
                    <motion.div
                      className="absolute -bottom-1 inset-x-0 mx-auto w-1 h-1 rounded-full bg-white/60"
                      animate={{
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                  )}
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Select for {label.toLowerCase()} valuation</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
