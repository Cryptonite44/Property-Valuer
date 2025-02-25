
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
        {/* Powerful burst glow effect */}
        <motion.div
          className="absolute -inset-2 bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#0EA5E9] opacity-75 blur-2xl rounded-lg"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -inset-2 bg-gradient-to-r from-[#F97316] via-[#8B5CF6] to-[#D946EF] opacity-75 blur-2xl rounded-lg"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        
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
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  AI-powered property valuations in seconds
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 0.7,
                    type: "spring",
                    stiffness: 200,
                    damping: 10
                  }}
                >
                  <Wand2 className="w-4 h-4 text-[#FFD700] animate-pulse" />
                </motion.div>
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
        
        {/* Add subtle floating shapes in the background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full mix-blend-overlay filter blur-xl"
            animate={{
              y: [0, 50, 0],
              x: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full mix-blend-overlay filter blur-xl"
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      </motion.div>
    </TooltipProvider>
  );
};

export default ValueForm;
