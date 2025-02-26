
import React from "react";
import { motion } from "framer-motion";
import { Wand2 } from "lucide-react";
import {
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export const FormHeader = () => {
  return (
    <CardHeader className="text-center">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-10"
      >
        <CardTitle className="text-white text-3xl">
          Property Details
        </CardTitle>
        <CardDescription className="text-lg mt-2 text-white/70">
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center">
              <span>AI-powered property</span>
              <span>valuations in seconds</span>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 0.7,
                type: "spring",
                stiffness: 200,
                damping: 10
              }}
              className="mt-2"
            >
              <Wand2 className="w-4 h-4 text-[#9b87f5]" />
            </motion.div>
          </div>
        </CardDescription>
      </motion.div>
    </CardHeader>
  );
};
