
import React, { useState } from "react";
import TypewriterText from "@/components/TypewriterText";
import ValueForm from "@/components/ValueForm";
import EstimateResult from "@/components/EstimateResult";

const Index = () => {
  const [estimatedValue, setEstimatedValue] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      {!estimatedValue ? (
        <>
          <div className="text-center mb-12 space-y-6">
            <h1 className="text-4xl md:text-5xl font-light mb-4">
              <TypewriterText text="How much is YOUR home worth?" />
            </h1>
            <p className="text-xl md:text-2xl font-light text-muted-foreground max-w-2xl mx-auto">
              We'll help you find out, quickly and easily. Ready to see your
              house's value?
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
  );
};

export default Index;
