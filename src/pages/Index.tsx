
import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/Footer";
import { ValuationContent } from "@/components/property-valuation/ValuationContent";
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

  console.log('Current state:', { estimatedValue, analysis }); // Debug log

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[radial-gradient(ellipse_at_top,#1F2937_0%,#111827_100%)]">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center w-full">
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
