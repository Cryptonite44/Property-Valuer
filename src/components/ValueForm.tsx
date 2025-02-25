
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
import { Loader } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

const PropertyTypeIcons = [
  { type: 'house', icon: '🏠', label: 'House' },
  { type: 'apartment', icon: '🏢', label: 'Apartment' },
  { type: 'land', icon: '🌳', label: 'Land' },
  { type: 'commercial', icon: '🏪', label: 'Commercial' },
];

const ValueForm = ({ onEstimate }: { onEstimate: (value: number, analysis?: AIAnalysis) => void }) => {
  const { toast } = useToast();
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('house');

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

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
        body: { address, propertyType: selectedType }
      });

      if (error || !data) {
        throw new Error(error?.message || 'Failed to analyze property');
      }

      toast({
        title: `Analysis Complete`,
        description: "Based on historical sales data and market trends",
      });

      onEstimate(data.estimatedValue, data);
    } catch (error) {
      console.error('Error analyzing property:', error);
      toast({
        title: "Error analyzing property",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TooltipProvider>
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
            {/* Property Type Selection */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {PropertyTypeIcons.map(({ type, icon, label }) => (
                <Tooltip key={type}>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => setSelectedType(type)}
                      className={`p-4 rounded-lg text-center transition-all ${
                        selectedType === type
                          ? 'bg-white/10 border-2 border-white/20'
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-2xl mb-1 block">{icon}</span>
                      <span className="text-xs text-muted-foreground">{label}</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Select for {label.toLowerCase()} valuation</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm text-muted-foreground">Full Property Address</Label>
              <Input
                id="address"
                placeholder="Enter the complete property address"
                value={address}
                onChange={handleAddressChange}
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
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader className="w-4 h-4 animate-spin" />
                  Analyzing...
                </span>
              ) : (
                "Get Estimate"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default ValueForm;
