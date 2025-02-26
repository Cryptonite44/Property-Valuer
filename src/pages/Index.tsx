import React, { useState } from "react";
import TypewriterText from "@/components/TypewriterText";
import ValueForm from "@/components/ValueForm";
import EstimateResult from "@/components/EstimateResult";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

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
        className="sticky top-0 w-full z-20 pb-2"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent backdrop-blur-sm -z-10" />
        <div className="w-full px-3">
          <div className="py-3">
            <div className="glass-panel py-3 px-4 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              />
              
              <div className="flex flex-col gap-4 relative z-10">
                <motion.div 
                  className="flex items-center justify-between"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
                      <Building2 className="w-5 h-5 text-[#9b87f5]" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-base tracking-tight text-white/90">PropertyValuer</span>
                      <span className="text-xs font-medium text-gray-400">by Digitol</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex-1 flex flex-col items-center justify-center w-full px-4 py-4">
        {!estimatedValue ? (
          <>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-5 space-y-3"
            >
              <div className="relative px-2">
                <h1 className="text-xl sm:text-2xl font-light mb-2 text-gradient glow relative z-10 px-4">
                  <TypewriterText text="Superfast Property Valuer" />
                </h1>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl -z-10" />
              </div>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-sm font-light text-muted-foreground px-6 flex flex-col gap-1"
              >
                <span>Get an AI-powered estimate based</span>
                <span>on local market data</span>
              </motion.p>
              
              <div className="flex flex-wrap justify-center gap-2 mt-3 px-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="feature-pill"
                >
                  <FileText className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-[11px] font-medium text-white/90">No Long Forms</span>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="feature-pill"
                >
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-[11px] font-medium text-white/90">Quick & Easy</span>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="feature-pill"
                >
                  <Zap className="w-3.5 h-3.5 text-yellow-400" />
                  <span className="text-[11px] font-medium text-white/90">Instant Valuation</span>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="w-full px-2"
            >
              <ValueForm onEstimate={handleEstimate} />
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full px-2"
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
