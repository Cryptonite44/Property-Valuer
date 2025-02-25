
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
      className="space-y-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Label htmlFor="address" className="text-sm text-white/70">
        Full Property Address
      </Label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4 z-20" />
        <Input
          id="address"
          placeholder="Enter the complete property address"
          value={address}
          onChange={onChange}
          className="bg-white/5 border-white/10 focus:border-[#3b82f6]/50 transition-all duration-300 pl-10 rounded-lg text-white placeholder:text-white/30 focus:ring-2 focus:ring-[#3b82f6]/20 shadow-[0_0_20px_rgba(59,130,246,0.15)] focus:shadow-[0_0_30px_rgba(59,130,246,0.3)] focus:bg-white/10"
        />
      </div>
      <p className="text-xs text-white/50">
        Include postcode for more accurate results
      </p>
    </motion.div>
  );
};
