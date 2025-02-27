
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { PropertyTypeSelector } from "./property-form/PropertyTypeSelector";
import { SubmitButton } from "./property-form/SubmitButton";
import { FormHeader } from "./property-form/FormHeader";
import { BackgroundEffects } from "./property-form/BackgroundEffects";
import { AddressForm } from "./property-form/AddressForm";
import { AIAnalysis } from "@/types/property";
import { Brain, Building2, ChartLine, Sparkles } from "lucide-react";

interface ValueRange {
  lower: number;
  upper: number;
}

const ValueForm = ({ onEstimate }: { onEstimate: (value: ValueRange, analysis?: AIAnalysis) => void }) => {
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

      if (!data || !data.estimatedValue || !data.estimatedValue.lower || !data.estimatedValue.upper) {
        throw new Error('Invalid response format from analysis');
      }

      // Show success toast
      toast({
        title: "Analysis Complete",
        description: "Based on historical sales data and market trends",
      });

      // Call onEstimate with the complete data object
      onEstimate(data.estimatedValue as ValueRange, data as AIAnalysis);
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
      <div className="relative w-full">
        {/* Full-page loading overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-[#0A0118]/90 backdrop-blur-sm"
            >
              <motion.div
                className="relative w-full max-w-3xl h-full flex flex-col items-center justify-center px-4"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Cosmic background effect */}
                <motion.div 
                  className="absolute inset-0 overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  {/* Star particles */}
                  {[...Array(50)].map((_, i) => (
                    <motion.div 
                      key={i}
                      className="absolute rounded-full bg-white"
                      style={{
                        width: Math.random() * 3 + 1,
                        height: Math.random() * 3 + 1,
                        filter: `blur(${Math.random() * 1}px)`,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.5 + 0.3,
                      }}
                      animate={{
                        y: [0, -(Math.random() * 100 + 50)],
                        x: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50],
                        opacity: [0.5, 0],
                        scale: [1, Math.random() * 0.5 + 0.5],
                      }}
                      transition={{
                        duration: Math.random() * 4 + 3,
                        repeat: Infinity,
                        repeatDelay: Math.random() * 2,
                      }}
                    />
                  ))}
                  
                  {/* Glowing orbs */}
                  <motion.div
                    className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                      x: [-20, 20, -20],
                      y: [-20, 20, -20],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                  
                  <motion.div
                    className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl"
                    animate={{
                      scale: [1.2, 1, 1.2],
                      opacity: [0.2, 0.4, 0.2],
                      x: [20, -20, 20],
                      y: [20, -20, 20],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 1,
                    }}
                  />
                </motion.div>
                
                {/* Central content - visual elements only, no text */}
                <div className="z-10">
                  <motion.div
                    className="flex flex-col items-center"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {/* Advanced AI analysis visualization */}
                    <div className="relative">
                      <motion.div
                        className="relative flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 260, 
                          damping: 20,
                          delay: 0.3
                        }}
                      >
                        {/* Orbit effect */}
                        <motion.div
                          className="absolute w-44 h-44 rounded-full border border-purple-500/30"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        >
                          <motion.div
                            className="absolute -top-2 -left-2 bg-blue-400 p-2 rounded-full flex items-center justify-center"
                            animate={{
                              boxShadow: [
                                "0 0 8px rgba(96, 165, 250, 0.5)",
                                "0 0 16px rgba(96, 165, 250, 0.7)",
                                "0 0 8px rgba(96, 165, 250, 0.5)"
                              ]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatType: "reverse"
                            }}
                          >
                            <Building2 className="w-4 h-4 text-white" />
                          </motion.div>
                        </motion.div>
                        
                        <motion.div
                          className="absolute w-64 h-64 rounded-full border border-indigo-500/20"
                          animate={{ rotate: -360 }}
                          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        >
                          <motion.div
                            className="absolute top-2 -right-2 bg-green-400 p-2 rounded-full flex items-center justify-center"
                            animate={{
                              boxShadow: [
                                "0 0 8px rgba(74, 222, 128, 0.5)",
                                "0 0 16px rgba(74, 222, 128, 0.7)",
                                "0 0 8px rgba(74, 222, 128, 0.5)"
                              ]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatType: "reverse",
                              delay: 0.5
                            }}
                          >
                            <ChartLine className="w-4 h-4 text-white" />
                          </motion.div>
                        </motion.div>
                        
                        {/* Central brain element */}
                        <motion.div 
                          className="relative z-10 bg-gradient-to-br from-violet-600 to-purple-700 p-5 rounded-full flex items-center justify-center"
                          animate={{
                            scale: [1, 1.05, 1],
                            boxShadow: [
                              "0 0 20px rgba(139, 92, 246, 0.5)",
                              "0 0 40px rgba(139, 92, 246, 0.7)",
                              "0 0 20px rgba(139, 92, 246, 0.5)"
                            ]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                        >
                          <Brain className="w-10 h-10 text-white" />
                          
                          {/* Sparkles around the brain */}
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute"
                              style={{
                                top: `${50 + 30 * Math.cos(i * Math.PI / 3)}%`,
                                left: `${50 + 30 * Math.sin(i * Math.PI / 3)}%`,
                              }}
                              initial={{ 
                                scale: 0,
                                opacity: 0
                              }}
                              animate={{
                                scale: [0, 1, 0],
                                opacity: [0, 1, 0]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: Math.random() * 2,
                                delay: i * 0.2
                              }}
                            >
                              <Sparkles className="text-yellow-300" size={16} />
                            </motion.div>
                          ))}
                        </motion.div>
                      </motion.div>
                      
                      {/* Loading dots only - no text */}
                      <motion.div
                        className="flex items-center justify-center mt-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        <motion.div className="flex space-x-4 items-center">
                          {[0, 1, 2].map((dot) => (
                            <motion.div
                              key={dot}
                              className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-blue-500"
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5],
                                boxShadow: [
                                  "0 0 4px rgba(168, 85, 247, 0.4)",
                                  "0 0 8px rgba(168, 85, 247, 0.7)",
                                  "0 0 4px rgba(168, 85, 247, 0.4)"
                                ]
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatDelay: 0,
                                delay: dot * 0.2
                              }}
                            />
                          ))}
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
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
      </div>
    </TooltipProvider>
  );
};

export default ValueForm;
