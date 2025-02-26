
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
    text: "This property valuation tool is incredibly accurate! The AI-powered estimate was within 2% of my eventual sale price.",
    rating: 5,
    timestamp: new Date(2024, 3, 15, 14, 30)
  },
  {
    id: 2,
    initials: "SH",
    name: "Sarah Harris",
    location: "Manchester Realtor",
    text: "As a real estate agent, I use this tool daily. It gives me reliable valuations that help set realistic expectations.",
    rating: 5,
    timestamp: new Date(2024, 3, 14, 9, 45)
  },
  {
    id: 3,
    initials: "MR",
    name: "Mike Robinson",
    location: "Bristol Property Developer",
    text: "Outstanding accuracy across different property types. Saves me hours of research for each project.",
    rating: 5,
    timestamp: new Date(2024, 3, 13, 16, 20)
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
            className="bg-[#1A1F2C] border border-white/10 rounded-2xl p-6 shadow-xl"
          >
            <Quote className="w-8 h-8 text-[#9b87f5] mb-4 opacity-50" />
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] flex items-center justify-center">
                  <span className="text-lg font-semibold text-white">{review.initials}</span>
                </div>
                <div>
                  <h4 className="text-white font-medium">{review.name}</h4>
                  <p className="text-white/60 text-sm">{review.location}</p>
                </div>
              </div>
              <p className="text-white/90 text-sm italic">
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
                <p className="text-white/40 text-xs">
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
