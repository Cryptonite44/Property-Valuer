
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

interface FormData {
  address: string;
}

interface AIAnalysis {
  estimatedValue: number;
  confidence: 'low' | 'medium' | 'high';
  factors: string[];
  analysis: string;
}

const ValueForm = ({ onEstimate }: { onEstimate: (value: number, analysis?: AIAnalysis) => void }) => {
  const { toast } = useToast();
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
      toast({
        title: "Please enter an address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-property', {
        body: { address }
      });

      if (error) {
        throw error;
      }

      const analysis: AIAnalysis = data;
      
      toast({
        title: `Analysis Confidence: ${analysis.confidence}`,
        description: "Based on historical sales data and market trends",
      });

      onEstimate(analysis.estimatedValue, analysis);
    } catch (error) {
      console.error('Error analyzing property:', error);
      toast({
        title: "Error analyzing property",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto glass-panel animate-fade-up">
      <CardHeader>
        <CardTitle className="bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#FFE5B4] bg-clip-text text-transparent">
          Property Details
        </CardTitle>
        <CardDescription className="text-lg">
          Enter your property address for an AI-powered estimate based on historical sales data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm text-muted-foreground">Full Property Address</Label>
            <Input
              id="address"
              placeholder="Enter the complete property address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-white/5 border-white/10 focus:border-white/20 transition-colors"
            />
            <p className="text-xs text-muted-foreground">
              Include postcode for more accurate results
            </p>
          </div>
          <Button 
            type="submit" 
            className="w-full mt-8 bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#FFE5B4] text-black font-medium hover:opacity-90 transition-opacity"
            disabled={isLoading}
          >
            {isLoading ? "Analyzing..." : "Get Estimate"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ValueForm;
