import React, { useState } from "react";
import TypewriterText from "@/components/TypewriterText";
import ValueForm from "@/components/ValueForm";
import EstimateResult from "@/components/EstimateResult";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { ShieldCheck, Building2, Lock, UserCheck, Search, Star, Shield, Clock, FileText, Zap } from "lucide-react";

interface PropertyDetails {
  location: {
    description: string;
    amenities: string[];
  };
  education: {
    description: string;
    schools: string[];
  };
  transport: {
    description: string;
    links: string[];
  };
  marketActivity: {
    recentSales: string;
    priceChanges: string;
  };
}

interface AIAnalysis {
  estimatedValue: number;
  confidence: 'low' | 'medium' | 'high';
  analysis: string;
  details: PropertyDetails;
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
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[radial-gradient(ellipse_at_top,#1F2937_0%,#111827_100%)]">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 w-full z-20"
      >
        <div className="w-full px-3 sm:px-4">
          <div className="py-3">
            <div className="glass-panel py-3 px-4">
              <div className="flex flex-col gap-4">
                <motion.div 
                  className="flex items-center space-x-3 text-white"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="p-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <Building2 className="w-6 h-6 text-[#9b87f5]" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-base tracking-tight">PropertyValuer</span>
                    <span className="text-xs text-gray-400">by Digitol</span>
                  </div>
                </motion.div>

                <div className="flex flex-wrap gap-2 -mx-1">
                  <motion.div 
                    className="flex-1 min-w-[140px] flex items-center justify-center space-x-2 px-3 py-2.5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Lock className="w-4 h-4 text-green-400" />
                    <span className="text-xs font-medium text-gray-300">SSL Secured</span>
                  </motion.div>
                  <motion.div 
                    className="flex-1 min-w-[140px] flex items-center justify-center space-x-2 px-3 py-2.5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <ShieldCheck className="w-4 h-4 text-green-400" />
                    <span className="text-xs font-medium text-gray-300">Secure Valuation</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex-1 flex flex-col items-center justify-center w-full px-4 py-6">
        {!estimatedValue ? (
          <>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-6 space-y-4"
            >
              <div className="relative px-2">
                <h1 className="text-2xl font-light mb-3 text-gradient glow relative z-10">
                  <TypewriterText text="Superfast Property Valuer" />
                </h1>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl -z-10" />
              </div>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-base font-light text-muted-foreground px-4"
              >
                Get an AI-powered estimate based on local market data
              </motion.p>
              
              <div className="flex flex-wrap justify-center gap-2 mt-4 px-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-medium text-white/90">No Long Forms</span>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-medium text-white/90">Quick & Easy</span>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs font-medium text-white/90">Instant Valuation</span>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="w-full px-3"
            >
              <ValueForm onEstimate={handleEstimate} />
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full px-3"
          >
            <EstimateResult
              value={estimatedValue}
              analysis={analysis}
              onReset={handleReset}
            />
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Index;
