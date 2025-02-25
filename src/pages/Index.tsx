
import React, { useState } from "react";
import TypewriterText from "@/components/TypewriterText";
import ValueForm from "@/components/ValueForm";
import EstimateResult from "@/components/EstimateResult";
import { motion } from "framer-motion";
import { ShieldCheck, Building2, Lock, UserCheck, Search, Star, Shield } from "lucide-react";

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
    <div className="min-h-screen flex flex-col items-center justify-center p-2 md:p-8 relative overflow-hidden bg-[radial-gradient(ellipse_at_top,#1F2937_0%,#111827_100%)]">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 w-full flex flex-col md:flex-row items-center justify-between p-3 md:p-4 z-20 bg-gradient-to-b from-[rgb(17,24,39)] to-transparent gap-2 md:gap-0"
      >
        <motion.div 
          className="flex items-center space-x-2 text-white"
          whileHover={{ scale: 1.02 }}
        >
          <Building2 className="w-6 md:w-8 h-6 md:h-8 text-[#FFD700]" />
          <div>
            <h2 className="font-semibold text-base md:text-lg">PropertyValuer</h2>
            <p className="text-xs text-gray-400">by Digitol</p>
          </div>
        </motion.div>

        <div className="flex items-center gap-2 md:gap-4 flex-wrap justify-center">
          <motion.div 
            className="flex items-center space-x-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Lock className="w-3 md:w-4 h-3 md:h-4 text-green-400" />
            <span className="text-xs md:text-sm text-gray-300">SSL Secured</span>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <ShieldCheck className="w-3 md:w-4 h-3 md:h-4 text-green-400" />
            <span className="text-xs md:text-sm text-gray-300">Secure Valuation</span>
          </motion.div>
          <motion.div 
            className="hidden lg:flex items-center space-x-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Shield className="w-3 md:w-4 h-3 md:h-4 text-blue-400" />
            <span className="text-xs md:text-sm text-gray-300">GDPR Compliant</span>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed bottom-0 left-0 right-0 w-full flex justify-center p-2 md:p-4 z-20 bg-gradient-to-t from-[rgb(17,24,39)] to-transparent"
      >
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 text-white max-w-5xl">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <Search className="w-3 md:w-4 h-3 md:h-4 text-green-400" />
            <span className="text-xs md:text-sm">247 valuations today</span>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <UserCheck className="w-3 md:w-4 h-3 md:h-4 text-blue-400" />
            <span className="text-xs md:text-sm">50,000+ valuations</span>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="hidden md:flex items-center space-x-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <Star className="w-3 md:w-4 h-3 md:h-4 text-yellow-400" />
            <span className="text-xs md:text-sm">4.9/5 from 2,000+ users</span>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-full opacity-50">
          <div className="absolute top-[10%] left-[5%] w-48 h-48 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
          <div className="absolute top-[20%] right-[5%] w-48 h-48 bg-yellow-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-[10%] left-[35%] w-48 h-48 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
        </div>
      </div>
      
      <div className="relative z-10 w-full max-w-5xl mx-auto mt-24 md:mt-16 mb-20 md:mb-24 px-3 md:px-4">
        {!estimatedValue ? (
          <>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 md:mb-12 space-y-4 md:space-y-6"
            >
              <div className="relative">
                <h1 className="text-3xl md:text-6xl font-light mb-3 md:mb-4 text-gradient glow relative z-10">
                  <TypewriterText text="Superfast Property Valuer" />
                </h1>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl -z-10" />
              </div>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg md:text-2xl font-light text-muted-foreground max-w-2xl mx-auto"
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
