
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { motion } from "framer-motion";

interface SubmitButtonProps {
  isLoading: boolean;
}

export const SubmitButton = ({ isLoading }: SubmitButtonProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <Button 
        type="submit" 
        className={`w-full mt-8 relative overflow-hidden ${
          isLoading 
            ? 'bg-white/10' 
            : 'bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#FFE5B4] text-black'
        } font-medium hover:opacity-90 transition-all`}
        disabled={isLoading}
      >
        {isLoading ? (
          <motion.span 
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Loader className="w-4 h-4 animate-spin" />
            Analyzing...
          </motion.span>
        ) : (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10"
          >
            Get Estimate
          </motion.span>
        )}
      </Button>
    </motion.div>
  );
};
