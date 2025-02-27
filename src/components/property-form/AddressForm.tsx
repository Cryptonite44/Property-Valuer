
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";

interface AddressFormProps {
  address: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AddressForm = ({ address, onChange }: AddressFormProps) => {
  return (
    <div className="space-y-2">
      <Label 
        htmlFor="address" 
        className="text-white flex items-center gap-2 text-sm font-medium mb-1.5"
      >
        <MapPin className="h-3.5 w-3.5 text-purple-400" />
        Property Address
      </Label>
      
      <div className="relative">
        <Input
          id="address"
          placeholder="Enter a UK property address"
          value={address}
          onChange={onChange}
          className="bg-[#191627] text-white border-[#252033] h-12 pl-10 pr-4 placeholder:text-gray-500 focus:border-[#6C47FF] focus:ring-[#6C47FF]/10 transition-all duration-200"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          <Search className="h-4 w-4" />
        </div>
        
        {/* The icon that was here has been removed as it had no functionality */}
      </div>
      
      <div className="text-xs text-gray-500 mt-1.5 flex gap-1.5 items-center">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="text-purple-400 text-[10px]"
        >
          ✦
        </motion.div>
        Enter your full address including postcode for the most accurate results
      </div>
    </div>
  );
};
