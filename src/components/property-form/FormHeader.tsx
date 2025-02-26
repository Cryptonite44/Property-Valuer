
import React from "react";
import { motion } from "framer-motion";
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
              <span>Get an AI-powered estimate</span>
              <span>based on local market data</span>
            </div>
          </div>
        </CardDescription>
      </motion.div>
    </CardHeader>
  );
};
