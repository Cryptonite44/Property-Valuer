
import React from "react";
import { motion } from "framer-motion";
import ValueForm from "@/components/ValueForm";
import EstimateResult from "@/components/EstimateResult";
import { CustomerReview } from "@/components/CustomerReview";
import { IntroSection } from "./IntroSection";
import { AIAnalysis } from "@/types/property";

interface ValuationContentProps {
  estimatedValue: number | null;
  analysis?: AIAnalysis;
  onEstimate: (value: number, analysis?: AIAnalysis) => void;
  onReset: () => void;
}

export const ValuationContent = ({ 
  estimatedValue, 
  analysis, 
  onEstimate, 
  onReset 
}: ValuationContentProps) => {
  if (estimatedValue === null) {
    return (
      <>
        <IntroSection />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: 0.6,
            duration: 0.8,
            ease: "easeOut"
          }}
          className="w-full max-w-screen-sm mx-auto px-4"
        >
          <ValueForm onEstimate={onEstimate} />
        </motion.div>
        <CustomerReview />
      </>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full px-2"
    >
      <EstimateResult
        value={estimatedValue}
        analysis={analysis}
        onReset={onReset}
      />
    </motion.div>
  );
};
