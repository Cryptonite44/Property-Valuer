
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
import { Loader, Search, MapPin, Building2, TreeDeciduous, Store } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";

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
  { type: 'house', icon: <Building2 className="w-6 h-6" />, label: 'House', color: 'from-blue-500/20 to-blue-600/20' },
  { type: 'apartment', icon: <MapPin className="w-6 h-6" />, label: 'Apartment', color: 'from-purple-500/20 to-purple-600/20' },
  { type: 'land', icon: <TreeDeciduous className="w-6 h-6" />, label: 'Land', color: 'from-green-500/20 to-green-600/20' },
  { type: 'commercial', icon: <Store className="w-6 h-6" />, label: 'Commercial', color: 'from-amber-500/20 to-amber-600/20' },
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md mx-auto"
      >
        {/* Enhanced ambient glow with multiple layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6]/20 via-purple-500/20 to-[#3b82f6]/20 blur-3xl -z-10" />
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-pink-500/10 to-orange-500/10 blur-2xl -z-10" />
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3b82f6]/10 to-purple-500/10 blur-2xl -z-10 animate-pulse" />
        </div>
        
        <Card className="relative w-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(59,130,246,0.15)] overflow-hidden">
          {/* Enhanced gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none" />
          
          <CardHeader>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative z-10"
            >
              <CardTitle className="bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#FFE5B4] bg-clip-text text-transparent text-3xl relative">
                Property Details
                <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700]/20 to-[#FFE5B4]/20 blur-lg -z-10" />
              </CardTitle>
              <CardDescription className="text-lg mt-2 text-white/70">
                Enter your property address for an AI-powered estimate
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="relative z-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                {PropertyTypeIcons.map(({ type, icon, label, color }, index) => (
                  <Tooltip key={type}>
                    <TooltipTrigger asChild>
                      <motion.button
                        type="button"
                        onClick={() => setSelectedType(type)}
                        className={`relative p-4 rounded-lg text-center transition-all overflow-hidden group
                          ${selectedType === type
                            ? 'bg-white/10 border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                            : 'bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10'
                          }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10">
                          <div className="text-2xl mb-2 flex justify-center">
                            {icon}
                          </div>
                          <span className="text-xs text-white/70">{label}</span>
                        </div>
                      </motion.button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Select for {label.toLowerCase()} valuation</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </motion.div>

              <motion.div 
                className="space-y-2 relative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Label htmlFor="address" className="text-sm text-white/70">
                  Full Property Address
                </Label>
                <div className="relative group">
                  <div 
                    className="absolute inset-0 rounded-lg border border-[#3b82f6]/30 shadow-[0_0_15px_rgba(59,130,246,0.15)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-shadow"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(59,130,246,0.1), transparent)',
                    }}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4 z-20" />
                  <Input
                    id="address"
                    placeholder="Enter the complete property address"
                    value={address}
                    onChange={handleAddressChange}
                    className="relative bg-white/5 border-white/10 focus:border-white/20 transition-all pl-10 z-10 rounded-lg text-white placeholder:text-white/30 hover:bg-white/10"
                  />
                </div>
                <p className="text-xs text-white/50">
                  Include postcode for more accurate results
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button 
                  type="submit" 
                  className={`w-full mt-8 relative overflow-hidden ${
                    isLoading 
                      ? 'bg-white/10' 
                      : 'bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#FFE5B4] text-black'
                  } font-medium hover:opacity-90 transition-all`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <motion.span 
                      className="flex items-center gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <Loader className="w-4 h-4 animate-spin" />
                      Analyzing...
                    </motion.span>
                  ) : (
                    <>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative z-10"
                      >
                        Get Estimate
                      </motion.span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#FFE5B4] opacity-75"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 0.9, 0.7],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </TooltipProvider>
  );
};

export default ValueForm;
