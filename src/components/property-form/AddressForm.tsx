
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Home } from "lucide-react";
import { motion } from "framer-motion";

interface AddressFormProps {
  address: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AddressForm = ({ address, onChange }: AddressFormProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div 
      className="space-y-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Label htmlFor="address" className="text-base text-white/70 block text-center mb-2 font-medium">
        Property Location
      </Label>
      
      <div className="relative">
        {/* Animated pulse/glow effect background */}
        <motion.div 
          className="absolute -inset-0.5 rounded-lg opacity-75"
          animate={{
            boxShadow: isFocused 
              ? [
                  "0 0 20px rgba(139, 92, 246, 0.3)", 
                  "0 0 30px rgba(139, 92, 246, 0.4)", 
                  "0 0 20px rgba(139, 92, 246, 0.3)"
                ]
              : "0 0 15px rgba(139, 92, 246, 0.2)"
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Decorative building icon */}
        <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-white/30 z-20 flex items-center">
          <Home className="w-4 h-4" />
          <div className="hidden sm:block w-px h-5 bg-white/10 mx-3"></div>
        </div>
        
        {/* Main input container with border animation */}
        <motion.div 
          className={`absolute -inset-0.5 rounded-lg ${isFocused ? 'bg-gradient-to-r from-purple-600/50 via-indigo-600/50 to-blue-600/50' : 'bg-gradient-to-r from-purple-600/30 via-indigo-600/30 to-blue-600/30'}`}
          animate={{
            backgroundPosition: isFocused ? ["0% 50%", "100% 50%", "0% 50%"] : "0% 50%",
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
        />
        
        <div className="relative">
          <div className="absolute inset-0 rounded-lg bg-[#1A1F2C]/90 backdrop-blur-sm" />
          <Input
            id="address"
            placeholder="Enter address"
            value={address}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="relative bg-transparent border-white/10 transition-all duration-300 pl-10 sm:pl-14 pr-10 rounded-lg text-white placeholder:text-white/40 focus:ring-4 focus:ring-[#3b82f6]/20 focus:border-indigo-500/50 h-14 text-sm sm:text-base truncate"
          />
          
          {/* Search button positioned on the right */}
          <motion.div 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 p-1.5 rounded-md cursor-pointer z-20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Search className="w-4 h-4 text-white" />
          </motion.div>
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-white/50 text-center mt-2">
        <MapPin className="w-3 h-3 text-indigo-400" />
        <p>Include postcode for precise results</p>
      </div>
    </motion.div>
  );
};
