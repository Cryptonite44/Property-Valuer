
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import confetti from "canvas-confetti";

interface AIAnalysis {
  estimatedValue: number;
  confidence: 'low' | 'medium' | 'high';
  factors: string[];
  analysis: string;
}

interface EstimateResultProps {
  value: number;
  analysis?: AIAnalysis;
  onReset: () => void;
}

const EstimateResult: React.FC<EstimateResultProps> = ({ value, analysis, onReset }) => {
  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#FFD700", "#FDB931", "#FFE5B4"],
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#FFD700", "#FDB931", "#FFE5B4"],
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="w-full max-w-md mx-auto glass-panel animate-fade-up">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-light text-gradient">
          Your Estimated Property Value
        </CardTitle>
        <CardDescription className="text-lg">
          Based on AI analysis and market data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="text-center">
          <div className="text-5xl font-light mb-4 bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#FFE5B4] bg-clip-text text-transparent">
            {formatCurrency(value)}
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Confidence Level: <span className="font-medium">{analysis?.confidence.toUpperCase()}</span>
          </p>
        </div>
        
        {analysis && (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Key Factors:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {analysis.factors.map((factor, index) => (
                  <li key={index} className="text-sm text-muted-foreground">{factor}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Analysis:</h3>
              <p className="text-sm text-muted-foreground">{analysis.analysis}</p>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          <p className="text-sm text-center text-muted-foreground">
            Would you like a more accurate valuation? Our expert estate agents can provide a detailed
            analysis of your property's worth.
          </p>
          <div className="flex flex-col gap-3">
            <Button
              variant="outline"
              className="hover:bg-white/10 transition-colors"
              onClick={() => window.open("mailto:contact@example.com", "_blank")}
            >
              Contact an Estate Agent
            </Button>
            <Button 
              variant="secondary"
              className="hover:bg-white/10 transition-colors" 
              onClick={onReset}
            >
              Get Another Estimate
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EstimateResult;
