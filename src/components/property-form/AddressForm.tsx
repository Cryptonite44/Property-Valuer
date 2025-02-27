
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Home, Building2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AddressFormProps {
  address: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AddressForm = ({ address, onChange }: AddressFormProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [showLocationPing, setShowLocationPing] = useState(false);
  
  // Visual effect for address completion percentage
  useEffect(() => {
    if (address.length === 0) {
      setCompletionPercentage(0);
    } else if (address.length < 8) {
      setCompletionPercentage(25);
    } else if (address.length < 15) {
      setCompletionPercentage(50);
    } else if (address.length < 25) {
      setCompletionPercentage(75);
    } else {
      setCompletionPercentage(100);
    }
    
    // Show location ping after a short delay when typing stops
    if (address.length > 0) {
      const pingTimer = setTimeout(() => {
        setShowLocationPing(true);
      }, 1000);
      
      return () => {
        clearTimeout(pingTimer);
      };
    } else {
      setShowLocationPing(false);
    }
  }, [address]);
  
  // Track typing state
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true);
    onChange(e);
    
    // Reset typing indicator after delay
    const typingTimer = setTimeout(() => {
      setIsTyping(false);
    }, 800);
    
    return () => {
      clearTimeout(typingTimer);
    };
  };

  // Get color based on completion percentage
  const getCompletionColor = () => {
    if (completionPercentage < 40) return "from-red-500 to-orange-500";
    if (completionPercentage < 70) return "from-orange-500 to-yellow-500";
    if (completionPercentage < 100) return "from-green-500 to-emerald-500";
    return "from-emerald-500 to-teal-400";
  };

  return (
    <motion.div 
      className="relative w-full max-w-lg mx-auto overflow-visible py-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Title with icon decoration */}
      <div className="mb-3 text-center">
        <motion.div 
          className="inline-flex items-center px-4 py-1.5 bg-white/5 backdrop-blur-lg rounded-full border border-indigo-500/20 shadow-lg"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Building2 className="w-4 h-4 mr-2 text-indigo-400" />
          <Label className="text-sm font-medium text-white">
            Property Location
          </Label>
        </motion.div>
      </div>
      
      {/* Map-like container */}
      <div className="relative h-[160px] mb-2 overflow-hidden rounded-xl bg-gradient-to-b from-slate-800 to-slate-900 border border-white/10">
        {/* Background grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />
        
        {/* Glowing circles for "map locations" */}
        <motion.div 
          className="absolute w-5 h-5 bg-blue-400/10 rounded-full left-[20%] top-[25%]"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div 
          className="absolute w-4 h-4 bg-purple-400/10 rounded-full right-[30%] top-[60%]"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
        <motion.div 
          className="absolute w-3 h-3 bg-green-400/10 rounded-full left-[60%] top-[40%]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 2 }}
        />
        
        {/* Location pings when address is entered */}
        <AnimatePresence>
          {showLocationPing && (
            <motion.div 
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              {/* Ping circle animations */}
              <motion.div 
                className="absolute w-12 h-12 rounded-full border-2 border-indigo-500/40"
                animate={{ scale: [1, 2.5], opacity: [0.7, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
              />
              <motion.div 
                className="absolute w-8 h-8 rounded-full border-2 border-indigo-500/60"
                animate={{ scale: [1, 2], opacity: [0.7, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              />
              
              {/* Central pin */}
              <div className="relative flex items-center justify-center">
                <div className="w-4 h-4 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50 z-20" />
                <MapPin className="absolute w-8 h-8 text-indigo-400" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Input field with floating style */}
      <div className="relative bg-transparent">
        {/* Input container */}
        <div className={`relative rounded-lg transition-all duration-300 overflow-hidden ${isFocused ? 'shadow-lg shadow-indigo-500/20' : ''}`}>
          {/* Background effects */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 z-0 backdrop-blur-lg"
            animate={{
              opacity: isFocused ? 0.8 : 0.4
            }}
            transition={{ duration: 0.3 }}
          />
          
          <div className="relative z-10 flex items-center">
            {/* Icon container */}
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-8 h-8 bg-white/5 rounded-full">
              <Home className="w-4 h-4 text-indigo-300" />
            </div>
            
            {/* Input field */}
            <Input
              id="address"
              placeholder="Enter your property's full address including postcode"
              value={address}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full pl-14 pr-12 h-14 text-white bg-transparent border border-white/10 focus:border-indigo-500/50 transition-colors rounded-lg focus:ring-0 focus:outline-none"
            />
            
            {/* Animated loading/searching indicator */}
            <AnimatePresence>
              {isTyping ? (
                <motion.div
                  className="absolute right-14 top-1/2 transform -translate-y-1/2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
                </motion.div>
              ) : address.length > 0 && (
                <motion.div
                  className="absolute right-14 top-1/2 transform -translate-y-1/2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-xs font-medium px-1.5 py-0.5 rounded bg-white/10 text-white/70">
                    {completionPercentage}%
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Search button */}
            <motion.button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="w-4 h-4" />
            </motion.button>
          </div>
          
          {/* Progress bar */}
          <motion.div 
            className={`h-1 bg-gradient-to-r ${getCompletionColor()}`}
            initial={{ width: "0%" }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>
      
      {/* Helper text */}
      <div className="flex items-center justify-center mt-3 text-xs text-white/60">
        <MapPin className="w-3 h-3 mr-1 text-indigo-400" />
        <span>Complete address helps us provide the most accurate valuation</span>
      </div>
    </motion.div>
  );
};
