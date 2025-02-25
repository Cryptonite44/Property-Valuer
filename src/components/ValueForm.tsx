
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

interface FormData {
  address: string;
  size: string;
  bedrooms: string;
  propertyType: string;
}

interface AIAnalysis {
  estimatedValue: number;
  confidence: 'low' | 'medium' | 'high';
  factors: string[];
  analysis: string;
}

const ValueForm = ({ onEstimate }: { onEstimate: (value: number, analysis?: AIAnalysis) => void }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    address: "",
    size: "",
    bedrooms: "",
    propertyType: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.address || !formData.size || !formData.bedrooms || !formData.propertyType) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/functions/v1/analyze-property', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to get property analysis');
      }

      const analysis: AIAnalysis = await response.json();
      
      toast({
        title: `Analysis Confidence: ${analysis.confidence}`,
        description: "Based on AI analysis and local market data",
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
          Enter your property details for an AI-powered estimate
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm text-muted-foreground">Property Address</Label>
            <Input
              id="address"
              placeholder="Enter your property address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="bg-white/5 border-white/10 focus:border-white/20 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="size" className="text-sm text-muted-foreground">Square Metres</Label>
            <Input
              id="size"
              type="number"
              placeholder="Enter property size"
              value={formData.size}
              onChange={(e) => setFormData({ ...formData, size: e.target.value })}
              className="bg-white/5 border-white/10 focus:border-white/20 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bedrooms" className="text-sm text-muted-foreground">Number of Bedrooms</Label>
            <Select
              value={formData.bedrooms}
              onValueChange={(value) =>
                setFormData({ ...formData, bedrooms: value })
              }
            >
              <SelectTrigger className="bg-white/5 border-white/10">
                <SelectValue placeholder="Select bedrooms" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "bedroom" : "bedrooms"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="propertyType" className="text-sm text-muted-foreground">Property Type</Label>
            <Select
              value={formData.propertyType}
              onValueChange={(value) =>
                setFormData({ ...formData, propertyType: value })
              }
            >
              <SelectTrigger className="bg-white/5 border-white/10">
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Flat</SelectItem>
                <SelectItem value="maisonette">Maisonette</SelectItem>
              </SelectContent>
            </Select>
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
