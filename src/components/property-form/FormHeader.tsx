
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
        <CardDescription className="text-lg mt-2 text-white/80">
          Enter your property details below for an instant AI-powered valuation
        </CardDescription>
      </motion.div>
    </CardHeader>
  );
};
