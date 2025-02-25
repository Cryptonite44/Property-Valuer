
import React, { useState } from "react";
import TypewriterText from "@/components/TypewriterText";
import ValueForm from "@/components/ValueForm";
import EstimateResult from "@/components/EstimateResult";

const Index = () => {
  const [estimatedValue, setEstimatedValue] = useState<number | null>(null);

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
                We'll help you find out, quickly and easily. Ready to see your
                property's value?
              </p>
            </div>
            <ValueForm onEstimate={setEstimatedValue} />
          </>
        ) : (
          <EstimateResult
            value={estimatedValue}
            onReset={() => setEstimatedValue(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
