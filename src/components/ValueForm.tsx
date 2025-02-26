
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

      // Check if there's an error in the response data
      if (data.error) {
        throw new Error(data.error);
      }

      // Validate the response format
      if (!data || typeof data.estimatedValue !== 'number') {
        throw new Error('Invalid response format from analysis');
      }

      // Ensure all required fields are present
      const analysisData: AIAnalysis = {
        estimatedValue: data.estimatedValue,
        confidence: data.confidence || 'medium',
        analysis: data.analysis || `Based on current market data for ${address}`,
        details: {
          location: {
            description: data.details?.location?.description || 'Area information not available',
            amenities: data.details?.location?.amenities || ['Local amenities']
          },
          education: {
            description: data.details?.education?.description || 'Education information not available',
            schools: data.details?.education?.schools || ['Local schools']
          },
          transport: {
            description: data.details?.transport?.description || 'Transport information not available',
            links: data.details?.transport?.links || ['Local transport']
          },
          marketActivity: {
            recentSales: data.details?.marketActivity?.recentSales || 'Recent sales data not available',
            priceChanges: data.details?.marketActivity?.priceChanges || 'Price trends not available'
          }
        }
      };

      // Show success toast
      toast({
        title: "Analysis Complete",
        description: "Based on historical sales data and market trends",
      });

      // Call onEstimate with validated data
      onEstimate(analysisData.estimatedValue, analysisData);
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
        
        <Card className="relative w-full bg-gradient-to-b from-[#1A1F2C] to-[#151821] border border-white/10 shadow-xl overflow-hidden backdrop-blur-sm">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-blue-500/5" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent" />
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <FormHeader />
            <CardContent className="relative z-10 p-6">
              <form onSubmit={handleSubmit} className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <PropertyTypeSelector
                    selectedType={selectedType}
                    onTypeSelect={setSelectedType}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <AddressForm 
                    address={address}
                    onChange={handleAddressChange}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="pt-2"
                >
                  <SubmitButton isLoading={isLoading} />
                </motion.div>
              </form>
            </CardContent>
          </motion.div>
        </Card>
      </motion.div>
    </TooltipProvider>
  );
};

export default ValueForm;
