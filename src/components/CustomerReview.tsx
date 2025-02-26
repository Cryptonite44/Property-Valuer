
import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export const CustomerReview = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="w-full max-w-4xl mx-auto px-4 py-12"
    >
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 blur-2xl" />
        <div className="relative bg-[#1A1F2C]/95 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-xl">
          <Quote className="w-10 h-10 text-[#9b87f5] mb-4 opacity-50" />
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <span className="text-2xl md:text-3xl font-semibold text-white">JD</span>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-lg md:text-xl text-white/90 font-medium italic mb-4">
                "This property valuation tool is incredibly accurate! I was skeptical at first, but the AI-powered estimate was within 2% of my eventual sale price. Absolutely brilliant service."
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-center md:justify-start space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-[#9b87f5] text-[#9b87f5]"
                    />
                  ))}
                </div>
                <div>
                  <h4 className="text-white font-medium">James Dean</h4>
                  <p className="text-white/60 text-sm">London Homeowner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
