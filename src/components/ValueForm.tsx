
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import {
  TooltipProvider,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { Wand2 } from "lucide-react";
import { PropertyTypeSelector } from "./property-form/PropertyTypeSelector";
import { AddressInput } from "./property-form/AddressInput";
import { SubmitButton } from "./property-form/SubmitButton";

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md mx-auto"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6]/10 via-purple-500/10 to-[#3b82f6]/10 blur-3xl -z-10" />
        
        <Card className="relative w-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
          
          <CardHeader>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative z-10"
            >
              <CardTitle className="bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#FFE5B4] bg-clip-text text-transparent text-3xl">
                Property Details
              </CardTitle>
              <CardDescription className="text-lg mt-2 text-white/70 flex items-center gap-2">
                AI-powered property valuations in seconds
                <Wand2 className="w-4 h-4 text-[#FFD700]" />
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="relative z-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <PropertyTypeSelector
                selectedType={selectedType}
                onTypeSelect={setSelectedType}
              />
              <AddressInput
                address={address}
                onChange={handleAddressChange}
              />
              <SubmitButton isLoading={isLoading} />
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </TooltipProvider>
  );
};

export default ValueForm;
