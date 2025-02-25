
import React, { useState } from "react";
import TypewriterText from "@/components/TypewriterText";
import ValueForm from "@/components/ValueForm";
import EstimateResult from "@/components/EstimateResult";
import { motion } from "framer-motion";

interface AIAnalysis {
  estimatedValue: number;
  confidence: 'low' | 'medium' | 'high';
  factors: string[];
  analysis: string;
}

const Index = () => {
  const [estimatedValue, setEstimatedValue] = useState<number | null>(null);
  const [analysis, setAnalysis] = useState<AIAnalysis | undefined>(undefined);

  const handleEstimate = (value: number, aiAnalysis?: AIAnalysis) => {
    setEstimatedValue(value);
    setAnalysis(aiAnalysis);
  };

  const handleReset = () => {
    setEstimatedValue(null);
    setAnalysis(undefined);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden bg-[radial-gradient(ellipse_at_top,#1F2937_0%,#111827_100%)]">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-full opacity-50">
          <div className="absolute top-[10%] left-[5%] w-48 h-48 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
          <div className="absolute top-[20%] right-[5%] w-48 h-48 bg-yellow-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-[10%] left-[35%] w-48 h-48 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
        </div>
      </div>
      
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {!estimatedValue ? (
          <>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 space-y-6"
            >
              <div className="relative">
                <h1 className="text-4xl md:text-6xl font-light mb-4 text-gradient glow relative z-10">
                  <TypewriterText text="Superfast Property Valuer" />
                </h1>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl -z-10" />
              </div>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-xl md:text-2xl font-light text-muted-foreground max-w-2xl mx-auto"
              >
                Get an AI-powered estimate based on local market data
              </motion.p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <ValueForm onEstimate={handleEstimate} />
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <EstimateResult
              value={estimatedValue}
              analysis={analysis}
              onReset={handleReset}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;
