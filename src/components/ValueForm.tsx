
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
import { PropertyType } from "@/types";

interface FormData {
  address: string;
}

interface AIAnalysis {
  estimatedValue: number;
  confidence: 'low' | 'medium' | 'high';
  factors: string[];
  analysis: string;
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
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('house');

  const handleAddressChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);

    if (value.length > 3) {
      // Simulate address autocomplete - replace with actual API call
      const mockSuggestions = [
        `${value} Street, London`,
        `${value} Road, Manchester`,
        `${value} Avenue, Birmingham`,
      ];
      setSuggestions(mockSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setAddress(suggestion);
    setSuggestions([]);
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

      if (!data.estimatedValue || !data.confidence || !data.factors || !data.analysis) {
        throw new Error('Invalid response from analysis');
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
              <div className="relative">
                <Input
                  id="address"
                  placeholder="Enter the complete property address"
                  value={address}
                  onChange={handleAddressChange}
                  className="bg-white/5 border-white/10 focus:border-white/20 transition-colors"
                />
                {suggestions.length > 0 && (
                  <div className="absolute w-full mt-1 bg-background border border-white/10 rounded-lg shadow-lg z-10">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        className="w-full px-4 py-2 text-left hover:bg-white/5 transition-colors first:rounded-t-lg last:rounded-b-lg"
                        onClick={() => handleSelectSuggestion(suggestion)}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
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

