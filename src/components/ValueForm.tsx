
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormData {
  address: string;
  size: string;
  bedrooms: string;
  propertyType: string;
}

const ValueForm = ({ onEstimate }: { onEstimate: (value: number) => void }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    address: "",
    size: "",
    bedrooms: "",
    propertyType: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.address || !formData.size || !formData.bedrooms || !formData.propertyType) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Dummy calculation for demo purposes
    const baseValue = 350000;
    const sizeMultiplier = parseInt(formData.size) * 150;
    const bedroomMultiplier = parseInt(formData.bedrooms) * 50000;
    const propertyTypeMultiplier = formData.propertyType === "house" ? 1.2 : 1;

    const estimatedValue = (baseValue + sizeMultiplier + bedroomMultiplier) * propertyTypeMultiplier;
    onEstimate(estimatedValue);
  };

  return (
    <Card className="w-full max-w-md mx-auto glass-panel animate-fade-up">
      <CardHeader>
        <CardTitle>Property Details</CardTitle>
        <CardDescription>
          Enter your property details to get an instant estimate
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Property Address</Label>
            <Input
              id="address"
              placeholder="Enter your property address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="bg-white/5"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="size">Square Footage</Label>
            <Input
              id="size"
              type="number"
              placeholder="Enter property size"
              value={formData.size}
              onChange={(e) => setFormData({ ...formData, size: e.target.value })}
              className="bg-white/5"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bedrooms">Number of Bedrooms</Label>
            <Select
              value={formData.bedrooms}
              onValueChange={(value) =>
                setFormData({ ...formData, bedrooms: value })
              }
            >
              <SelectTrigger className="bg-white/5">
                <SelectValue placeholder="Select bedrooms" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "bedroom" : "bedrooms"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="propertyType">Property Type</Label>
            <Select
              value={formData.propertyType}
              onValueChange={(value) =>
                setFormData({ ...formData, propertyType: value })
              }
            >
              <SelectTrigger className="bg-white/5">
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full mt-6">
            Get Estimate
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ValueForm;
