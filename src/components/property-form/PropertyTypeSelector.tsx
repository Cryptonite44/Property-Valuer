
import React from "react";
import { Building2, MapPin, Store, TreeDeciduous } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";

export const PropertyTypeIcons = [
  { type: 'house', icon: <Building2 className="w-6 h-6" />, label: 'House', color: 'from-blue-500/20 to-blue-600/20' },
  { type: 'apartment', icon: <MapPin className="w-6 h-6" />, label: 'Apartment', color: 'from-purple-500/20 to-purple-600/20' },
  { type: 'land', icon: <TreeDeciduous className="w-6 h-6" />, label: 'Land', color: 'from-green-500/20 to-green-600/20' },
  { type: 'commercial', icon: <Store className="w-6 h-6" />, label: 'Commercial', color: 'from-amber-500/20 to-amber-600/20' },
];

interface PropertyTypeSelectorProps {
  selectedType: string;
  onTypeSelect: (type: string) => void;
}

export const PropertyTypeSelector = ({ selectedType, onTypeSelect }: PropertyTypeSelectorProps) => {
  return (
    <motion.div 
      className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
    >
      {PropertyTypeIcons.map(({ type, icon, label, color }, index) => (
        <Tooltip key={type}>
          <TooltipTrigger asChild>
            <motion.button
              type="button"
              onClick={() => onTypeSelect(type)}
              className={`relative p-4 rounded-lg text-center transition-all overflow-hidden
                ${selectedType === type
                  ? 'bg-white/10 border border-white/20 shadow-lg'
                  : 'bg-white/5 hover:bg-white/10 border border-transparent'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-20`} />
              <div className="relative z-10">
                <div className="text-2xl mb-2 flex justify-center">
                  {icon}
                </div>
                <span className="text-xs text-white/70">{label}</span>
              </div>
            </motion.button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Select for {label.toLowerCase()} valuation</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </motion.div>
  );
};
