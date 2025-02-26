
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
    <div className="space-y-2 text-center">
      <Label htmlFor="address" className="text-sm text-white/70 block">
        Full Property Address
      </Label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4 z-20" />
        <Input
          id="address"
          placeholder="Enter the complete property address"
          value={address}
          onChange={onChange}
          className="relative bg-[#1A1F2C] border-white/10 focus:border-[#3b82f6]/50 transition-all duration-300 pl-10 rounded-lg text-white placeholder:text-white/30 focus:ring-4 focus:ring-[#3b82f6]/20 shadow-[0_0_30px_rgba(139,92,246,0.3)] focus:shadow-[0_0_40px_rgba(139,92,246,0.45),0_0_20px_rgba(139,92,246,0.35),inset_0_0_15px_rgba(139,92,246,0.25)] focus:bg-[#1A1F2C] z-10"
        />
      </div>
      <p className="text-xs text-white/50 text-center">
        Include postcode for more accurate results
      </p>
    </div>
  );
};
