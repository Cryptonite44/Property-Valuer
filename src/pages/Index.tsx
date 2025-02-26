
import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/Footer";
import { ValuationContent } from "@/components/property-valuation/ValuationContent";
import { BackgroundEffects } from "@/components/property-form/BackgroundEffects";
import { AIAnalysis } from "@/types/property";

interface ValueRange {
  lower: number;
  upper: number;
}

const Index = () => {
  const [estimatedValue, setEstimatedValue] = useState<ValueRange | null>(null);
  const [analysis, setAnalysis] = useState<AIAnalysis | undefined>(undefined);

  const handleEstimate = (value: ValueRange, aiAnalysis?: AIAnalysis) => {
    console.log('Handling estimate:', { value, aiAnalysis }); // Debug log
    
    if (value && typeof value.lower === 'number' && typeof value.upper === 'number') {
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

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#0A0118]">
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at 15% 50%, rgba(188, 104, 252, 0.03), transparent 25%),
            radial-gradient(circle at 85% 30%, rgba(88, 104, 252, 0.03), transparent 25%)
          `
        }}
      />
      {/* Grid Background */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.14]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: '-1px -1px'
        }}
      />
      <BackgroundEffects />
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center w-full relative z-10">
        <ValuationContent
          estimatedValue={estimatedValue}
          analysis={analysis}
          onEstimate={handleEstimate}
          onReset={handleReset}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
