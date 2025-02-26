
import React from "react";
import { motion } from "framer-motion";
import {
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export const FormHeader = () => {
  return (
    <CardHeader className="text-center px-6 pt-8 pb-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-10"
      >
        <CardTitle className="text-xl font-semibold text-white mb-2">Enter Property Details</CardTitle>
      </motion.div>
    </CardHeader>
  );
};
