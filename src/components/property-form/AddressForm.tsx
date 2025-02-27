
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Home, Building, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AddressFormProps {
  address: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AddressForm = ({ address, onChange }: AddressFormProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  // Track typing state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    setIsTyping(true);
    
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    
    const timeout = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
    
    setTypingTimeout(timeout);
  };
  
  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  return (
    <motion.div 
      className="space-y-3 w-full max-w-lg mx-auto"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-center gap-2 mb-2">
        <Building className="text-indigo-400 w-4 h-4" />
        <Label htmlFor="address" className="text-base text-white/90 font-medium">
          Where is your property located?
        </Label>
      </div>
      
      <div className="relative">
        {/* Cosmic background effect */}
        <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-600/20 via-indigo-600/20 to-blue-600/20 blur-md"></div>
        
        {/* Input container with 3D effect */}
        <div className="relative rounded-xl bg-gradient-to-b from-gray-800/90 to-gray-900/95 shadow-xl backdrop-blur-md border border-white/10 p-0.5 overflow-hidden">
          {/* Animated pulse at the bottom of input when focused */}
          <AnimatePresence>
            {isFocused && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500"
                style={{ 
                  boxShadow: "0 0 15px rgba(139, 92, 246, 0.7)",
                }}
              />
            )}
          </AnimatePresence>
          
          {/* Typing animation indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute right-12 top-1/2 transform -translate-y-1/2 z-20"
              >
                <div className="flex space-x-1">
                  <motion.div 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "loop", delay: 0 }}
                    className="w-1.5 h-1.5 rounded-full bg-indigo-400"
                  />
                  <motion.div 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "loop", delay: 0.1 }}
                    className="w-1.5 h-1.5 rounded-full bg-indigo-500"
                  />
                  <motion.div 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "loop", delay: 0.2 }}
                    className="w-1.5 h-1.5 rounded-full bg-indigo-600"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* House icon */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400 z-20 flex items-center">
            <Home className="w-5 h-5" />
          </div>
          
          {/* Main input field */}
          <Input
            id="address"
            placeholder="Enter complete property address with postcode"
            value={address}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="relative bg-transparent border-0 text-white placeholder:text-white/40 h-14 rounded-lg pl-12 pr-10 text-base focus:ring-0 focus:outline-none"
          />
          
          {/* Search button */}
          <motion.button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-md cursor-pointer z-30"
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Search className="w-4 h-4 text-white" />
          </motion.button>
        </div>
      </div>
      
      {/* Completion indicator */}
      <div className="flex items-center justify-center gap-2 text-sm text-white/60 mt-3">
        <div className="relative">
          <MapPin className="w-3.5 h-3.5 text-indigo-400" />
          <AnimatePresence>
            {address.length > 15 && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute -right-1 -top-1"
              >
                <Check className="w-2.5 h-2.5 text-green-400" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <p>Include full postcode for more accurate valuation results</p>
      </div>
    </motion.div>
  );
};
