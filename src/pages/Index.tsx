
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
    console.log('Handling estimate:', { value, aiAnalysis }); // Debug log
    
    // Only update states if we have valid data
    if (typeof value === 'number' && !isNaN(value)) {
      setEstimatedValue(value);
      setAnalysis(aiAnalysis);
    } else {
      console.error('Invalid value received:', value);
    }
  };

  const handleReset = () => {
    setEstimatedValue(null);
    setAnalysis(undefined);
  };

  console.log('Current state:', { estimatedValue, analysis }); // Debug log

  const renderContent = () => {
    if (estimatedValue === null) {
      return (
        <>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-8 space-y-6 relative px-4 sm:px-6 w-full"
          >
            <div className="relative max-w-[90vw] mx-auto">
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 blur-2xl"
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
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 relative z-10 break-words">
                <span className="inline-block text-white [background:linear-gradient(to_right,theme(colors.white)_0%,theme(colors.purple.200)_50%,theme(colors.white)_100%)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background-size:200%_auto] animate-text-shine">
                  <TypewriterText 
                    texts={[
                      { text: "Superfast", delay: 50 },
                      { text: " Property", delay: 150 },
                      { text: " Valuer", delay: 150 }
                    ]}
                  />
                </span>
              </h1>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.2,
                duration: 0.8,
                ease: "easeOut"
              }}
              className="space-y-3"
            >
              <p className="text-base sm:text-lg md:text-xl font-medium text-purple-200/90 tracking-wider px-2">
                Get an AI-powered estimate based
              </p>
              <p className="text-base sm:text-lg md:text-xl font-medium text-blue-200/90 tracking-wider px-2">
                on local market data
              </p>
              <motion.div
                className="w-24 h-1 mx-auto mt-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '6rem' }}
                transition={{ 
                  delay: 0.4,
                  duration: 1.2,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: 0.6,
              duration: 0.8,
              ease: "easeOut"
            }}
            className="w-full px-2"
          >
            <ValueForm onEstimate={handleEstimate} />
          </motion.div>
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
          onReset={handleReset}
        />
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[radial-gradient(ellipse_at_top,#1F2937_0%,#111827_100%)]">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 w-full z-20 pb-2"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent backdrop-blur-sm -z-10" />
        <div className="w-full">
          <div className="flex items-center justify-center py-3">
            <div className="glass-panel py-2 px-4 relative overflow-hidden">
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
              
              <div className="flex items-center relative z-10">
                <motion.div 
                  className="flex items-center"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
                    <Building2 className="w-5 h-5 text-[#9b87f5]" />
                  </div>
                  <div className="flex items-center space-x-2 ml-3">
                    <span className="font-semibold text-base tracking-tight text-white/90">PropertyValuer</span>
                    <span className="text-xs font-medium text-gray-400">by Digitol</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex-1 flex flex-col items-center justify-center w-full px-4 py-4">
        {renderContent()}
      </div>
      <Footer />
    </div>
  );
};

export default Index;
