
import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Review {
  id: number;
  initials: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  timestamp: Date;
}

const reviews: Review[] = [
  {
    id: 1,
    initials: "JD",
    name: "James Dean",
    location: "London Homeowner",
    text: "This property valuation tool is incredibly accurate! The AI-powered estimate was within 2% of my eventual sale price. Highly recommended for anyone looking to value their property.",
    rating: 5,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
  },
  {
    id: 2,
    initials: "SH",
    name: "Sarah Harris",
    location: "Manchester Realtor",
    text: "As a real estate professional, I've tried many valuation tools. This one stands out with its precision and ease of use. It gives me reliable valuations that help set realistic expectations.",
    rating: 5,
    timestamp: new Date(Date.now() - 16 * 60 * 60 * 1000) // 16 hours ago
  },
  {
    id: 3,
    initials: "MR",
    name: "Mike Robinson",
    location: "Bristol Property Developer",
    text: "Outstanding accuracy across different property types. The AI technology behind this tool is remarkable. Saves me hours of research for each project. A game-changer for property development.",
    rating: 5,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000) // 4 hours ago
  }
];

export const CustomerReview = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * review.id, duration: 0.6 }}
            className="bg-[#1A1F2C] border border-white/10 rounded-2xl p-6 shadow-xl hover:border-[#9b87f5]/30 transition-all duration-300 ease-in-out w-full"
          >
            <Quote className="w-8 h-8 text-[#9b87f5] mb-4 opacity-50" />
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] flex items-center justify-center shadow-lg ring-2 ring-white/5">
                  <span className="text-lg font-semibold text-white">{review.initials}</span>
                </div>
                <div>
                  <h4 className="text-white font-medium">{review.name}</h4>
                  <p className="text-white/60 text-sm">{review.location}</p>
                </div>
              </div>
              <p className="text-white/90 text-sm italic leading-relaxed">
                "{review.text}"
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#9b87f5] text-[#9b87f5]"
                    />
                  ))}
                </div>
                <p className="text-white/40 text-xs flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#9b87f5]/50"></span>
                  Posted {formatDistanceToNow(review.timestamp, { addSuffix: true })}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
