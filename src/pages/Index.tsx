
import React, { useState } from "react";
import TypewriterText from "@/components/TypewriterText";
import ValueForm from "@/components/ValueForm";
import EstimateResult from "@/components/EstimateResult";

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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
      </div>
      
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {!estimatedValue ? (
          <>
            <div className="text-center mb-12 space-y-6">
              <h1 className="text-4xl md:text-6xl font-light mb-4 text-gradient glow">
                <TypewriterText text="How much is YOUR property worth?" />
              </h1>
              <p className="text-xl md:text-2xl font-light text-muted-foreground max-w-2xl mx-auto">
                Get an AI-powered estimate based on local market data
              </p>
            </div>
            <ValueForm onEstimate={handleEstimate} />
          </>
        ) : (
          <EstimateResult
            value={estimatedValue}
            analysis={analysis}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
