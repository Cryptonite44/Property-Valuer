
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

interface EstimateResultProps {
  value: number;
  onReset: () => void;
}

const EstimateResult: React.FC<EstimateResultProps> = ({ value, onReset }) => {
  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ffffff"],
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ffffff"],
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto glass-panel animate-fade-up">
      <CardHeader>
        <CardTitle className="text-2xl font-light">
          Your Estimated Home Value
        </CardTitle>
        <CardDescription>Based on similar properties in your area</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-4xl font-light mb-2">
            ${value.toLocaleString()}
          </div>
          <p className="text-sm text-muted-foreground">
            This estimate is based on recent market data and similar properties in
            your area
          </p>
        </div>
        <div className="space-y-4">
          <p className="text-sm">
            Want a more accurate valuation? Our expert agents can provide a detailed
            analysis of your property's worth.
          </p>
          <div className="flex flex-col gap-3">
            <Button
              variant="outline"
              onClick={() =>
                window.open("mailto:contact@example.com", "_blank")
              }
            >
              Contact an Agent
            </Button>
            <Button variant="secondary" onClick={onReset}>
              Get Another Estimate
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EstimateResult;
