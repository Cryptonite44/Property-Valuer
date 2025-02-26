
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface AddressFormProps {
  address: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AddressForm = ({ address, onChange }: AddressFormProps) => {
  return (
    <div className="space-y-3">
      <Label htmlFor="address" className="text-base text-white/70 block text-center mb-2">
        Full Property Address
      </Label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4 z-20" />
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#9b87f5] via-[#8B5CF6] to-[#7E69AB] opacity-30 blur-xl rounded-lg" />
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#9b87f5] to-[#8B5CF6] opacity-20 blur-md rounded-lg" />
        <Input
          id="address"
          placeholder="Enter the complete property address"
          value={address}
          onChange={onChange}
          className="relative bg-[#1A1F2C] border-white/10 focus:border-[#3b82f6]/50 transition-all duration-300 pl-10 rounded-lg text-white placeholder:text-white/30 focus:ring-4 focus:ring-[#3b82f6]/20 shadow-[0_0_30px_rgba(139,92,246,0.35)] focus:shadow-[0_0_40px_rgba(139,92,246,0.5),0_0_20px_rgba(139,92,246,0.4),inset_0_0_15px_rgba(139,92,246,0.3)] focus:bg-[#1A1F2C] z-10 h-12"
        />
      </div>
      <p className="text-sm text-white/50 text-center mt-2">
        Include postcode for more accurate results
      </p>
    </div>
  );
};
