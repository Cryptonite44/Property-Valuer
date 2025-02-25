
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

interface AddressInputProps {
  address: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AddressInput = ({ address, onChange }: AddressInputProps) => {
  return (
    <motion.div 
      className="space-y-2 relative"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Label htmlFor="address" className="text-sm text-white/70">
        Full Property Address
      </Label>
      <div className="relative">
        {/* Enhanced glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#0EA5E9] opacity-75 blur-xl rounded-lg" />
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] opacity-50 blur-md rounded-lg" />
        
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4 z-20" />
        <Input
          id="address"
          placeholder="Enter the complete property address"
          value={address}
          onChange={onChange}
          className="relative bg-[#1A1F2C] border-white/10 focus:border-[#3b82f6]/50 transition-all duration-300 pl-10 rounded-lg text-white placeholder:text-white/30 focus:ring-4 focus:ring-[#3b82f6]/20 shadow-[0_0_30px_rgba(139,92,246,0.3)] focus:shadow-[0_0_40px_rgba(139,92,246,0.45),0_0_20px_rgba(139,92,246,0.35),inset_0_0_15px_rgba(139,92,246,0.25)] focus:bg-[#1A1F2C] z-10"
        />
      </div>
      <p className="text-xs text-white/50">
        Include postcode for more accurate results
      </p>
    </motion.div>
  );
};
