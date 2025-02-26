
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { PropertyTypeSelector } from "./property-form/PropertyTypeSelector";
import { SubmitButton } from "./property-form/SubmitButton";
import { FormHeader } from "./property-form/FormHeader";
import { BackgroundEffects } from "./property-form/BackgroundEffects";
import { AddressForm } from "./property-form/AddressForm";

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
      const response = await supabase.functions.invoke('analyze-property', {
        body: { address, propertyType: selectedType }
      });

      console.log('Full response:', response); // Debug log

      // Handle supabase error
      if (response.error) {
        throw new Error(response.error.message);
      }

      // Extract data from response
      const data = response.data;
      console.log('Extracted data:', data); // Debug log

      if (!data || !data.estimatedValue) {
        throw new Error('Invalid response format from analysis');
      }

      // Show success toast
      toast({
        title: "Analysis Complete",
        description: "Based on historical sales data and market trends",
      });

      // Call onEstimate with the complete data object
      onEstimate(parseFloat(data.estimatedValue), data as AIAnalysis);
    } catch (error: any) {
      console.error('Error in analysis:', error);
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md mx-auto"
      >
        <BackgroundEffects />
        
        <Card className="relative w-full bg-[#1A1F2C] border border-white/10 shadow-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
          <FormHeader />
          <CardContent className="relative z-10 space-y-10 py-8">
            <form onSubmit={handleSubmit} className="space-y-10">
              <PropertyTypeSelector
                selectedType={selectedType}
                onTypeSelect={setSelectedType}
              />
              <AddressForm 
                address={address}
                onChange={handleAddressChange}
              />
              <div className="pt-4">
                <SubmitButton isLoading={isLoading} />
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </TooltipProvider>
  );
};

export default ValueForm;
