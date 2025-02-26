
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import confetti from "canvas-confetti";
import {
  TrendingUp,
  MapPin,
  BarChart3,
  HomeIcon,
  Info,
  HelpCircle,
  School,
  TreePine,
  Bus,
  Landmark,
} from "lucide-react";

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

interface EstimateResultProps {
  value: number;
  analysis?: AIAnalysis;
  onReset: () => void;
}

interface ValuationFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const ConfidenceLevels = {
  low: { 
    color: "text-orange-400",
    description: "Limited data available. The estimate is based on broader market trends and similar properties in the region."
  },
  medium: {
    color: "text-yellow-400",
    description: "Good amount of data available. The estimate is based on recent sales and specific property characteristics."
  },
  high: {
    color: "text-green-400",
    description: "Excellent data available. The estimate is based on comprehensive market data and very similar properties."
  }
};

const EstimateResult: React.FC<EstimateResultProps> = ({ value, analysis, onReset }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<ValuationFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#FFD700", "#FDB931", "#FFE5B4"],
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#FFD700", "#FDB931", "#FFE5B4"],
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase.functions.invoke('send-valuation-email', {
        body: {
          ...formData,
          estimatedValue: formatCurrency(value)
        }
      });

      if (error) throw error;

      toast({
        title: "Valuation Request Sent",
        description: "We'll be in touch shortly to arrange your full valuation.",
      });
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error sending valuation request:', error);
      toast({
        title: "Error",
        description: "Failed to send valuation request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <TooltipProvider>
      <Card className="w-full bg-[#1A1F2C]/50 border-white/10 backdrop-blur-sm relative overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
            <div className="space-y-1">
              <CardTitle className="text-2xl md:text-3xl font-light text-gradient">
                Property Valuation
              </CardTitle>
              <CardDescription className="text-white/70">
                Based on our AI-powered analysis
              </CardDescription>
            </div>
            <Button
              variant="outline"
              onClick={onReset}
              className="border-white/10 text-white/70 hover:bg-white/5"
            >
              New Valuation
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Value Display */}
          <div className="p-4 md:p-6 rounded-lg bg-white/5 border border-white/10 space-y-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-white/5">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white/70">Estimated Value</p>
                  <h3 className="text-2xl md:text-3xl font-semibold text-white">
                    {formatCurrency(value)}
                  </h3>
                </div>
              </div>
              <Button
                onClick={() => setIsDialogOpen(true)}
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-6 py-2 h-auto"
              >
                Full Valuation
              </Button>
            </div>
            {analysis?.confidence && (
              <div className="flex items-center gap-2 text-sm">
                <Info className="w-4 h-4 text-blue-400" />
                <span className="text-white/70">
                  Confidence Level: <span className="text-white">{analysis.confidence}</span>
                </span>
              </div>
            )}
          </div>

          {/* Analysis Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Location Analysis */}
            <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-purple-400" />
                <h4 className="text-lg font-medium text-white">Location</h4>
              </div>
              <p className="text-sm text-white/70">{analysis?.details.location.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {analysis?.details.location.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/60"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* Education Analysis */}
            <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <School className="w-5 h-5 text-blue-400" />
                <h4 className="text-lg font-medium text-white">Education</h4>
              </div>
              <p className="text-sm text-white/70">{analysis?.details.education.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {analysis?.details.education.schools.map((school, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/60"
                  >
                    {school}
                  </span>
                ))}
              </div>
            </div>

            {/* Transport Analysis */}
            <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <Bus className="w-5 h-5 text-yellow-400" />
                <h4 className="text-lg font-medium text-white">Transport</h4>
              </div>
              <p className="text-sm text-white/70">{analysis?.details.transport.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {analysis?.details.transport.links.map((link, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/60"
                  >
                    {link}
                  </span>
                ))}
              </div>
            </div>

            {/* Market Activity */}
            <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <Landmark className="w-5 h-5 text-green-400" />
                <h4 className="text-lg font-medium text-white">Market Activity</h4>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-white/70">
                  <strong className="text-white">Recent Sales:</strong>{' '}
                  {Array.isArray(analysis?.details.marketActivity.recentSales) ? (
                    <div className="mt-2 space-y-2">
                      {analysis?.details.marketActivity.recentSales.map((sale: any, index: number) => (
                        <div key={index} className="text-xs bg-white/5 p-2 rounded">
                          {sale.address && <div>Address: {sale.address}</div>}
                          {sale.price && <div>Price: {formatCurrency(sale.price)}</div>}
                          {sale.date && <div>Date: {sale.date}</div>}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span>{analysis?.details.marketActivity.recentSales}</span>
                  )}
                </div>
                <p className="text-sm text-white/70">
                  <strong className="text-white">Price Changes:</strong>{' '}
                  {analysis?.details.marketActivity.priceChanges}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialog for full valuation request */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md bg-[#1A1F2C] text-white border-white/10 p-6">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-xl font-light text-gradient">Book Your Full Valuation</DialogTitle>
            <DialogDescription className="text-white/70">
              Please provide your details and we'll arrange a professional valuation of your property.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitForm} className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white/70">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/70">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                placeholder="Enter your email address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white/70">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                placeholder="Enter your phone number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="text-white/70">Property Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                placeholder="Enter the property address"
              />
            </div>
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="border-white/10 text-white/70 hover:bg-white/5"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
              >
                Submit Request
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};

export default EstimateResult;
