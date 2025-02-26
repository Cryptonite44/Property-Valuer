
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
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 w-full z-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 md:py-6">
            <div className="glass-panel py-3 px-4 md:px-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <motion.div 
                  className="flex items-center space-x-3 text-white self-start md:self-auto"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="p-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <Building2 className="w-6 md:w-7 h-6 md:h-7 text-[#9b87f5]" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-lg md:text-xl tracking-tight">PropertyValuer</span>
                    <span className="text-sm text-gray-400 whitespace-nowrap">by Digitol</span>
                  </div>
                </motion.div>

                <div className="flex items-center gap-2 md:gap-3 flex-wrap justify-center">
                  <motion.div 
                    className="flex items-center space-x-2 px-3 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Lock className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-300 whitespace-nowrap">SSL Secured</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center space-x-2 px-3 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <ShieldCheck className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-300 whitespace-nowrap">Secure Valuation</span>
                  </motion.div>
                  <motion.div 
                    className="hidden lg:flex items-center space-x-2 px-3 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Shield className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-gray-300 whitespace-nowrap">GDPR Compliant</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-full opacity-50">
          <div className="absolute top-[10%] left-[5%] w-32 md:w-48 h-32 md:h-48 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
          <div className="absolute top-[20%] right-[5%] w-32 md:w-48 h-32 md:h-48 bg-yellow-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-[10%] left-[35%] w-32 md:w-48 h-32 md:h-48 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-16">
        {!estimatedValue ? (
          <>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 md:mb-12 space-y-6"
            >
              <div className="relative px-4 md:px-0">
                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light mb-4 md:mb-6 text-gradient glow relative z-10">
                  <TypewriterText text="Superfast Property Valuer" />
                </h1>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl -z-10" />
              </div>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-base sm:text-lg md:text-2xl font-light text-muted-foreground max-w-2xl mx-auto px-4 md:px-0"
              >
                Get an AI-powered estimate based on local market data
              </motion.p>
              
              <div className="flex flex-wrap justify-center gap-3 mt-6 px-4 md:px-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-white/90">No Long Forms</span>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-white/90">Quick & Easy</span>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-white/90">Instant Valuation</span>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="w-full max-w-xl mx-auto px-4 md:px-0"
            >
              <ValueForm onEstimate={handleEstimate} />
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl mx-auto px-4 md:px-0"
          >
            <EstimateResult
              value={estimatedValue}
              analysis={analysis}
              onReset={handleReset}
            />
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
