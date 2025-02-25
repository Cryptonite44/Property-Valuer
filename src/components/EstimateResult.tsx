
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import confetti from "canvas-confetti";
import { 
  TrendingUp, 
  MapPin, 
  BarChart3, 
  HomeIcon, 
  Info,
  School,
  Store,
  Trees,
  Hospital,
  Coffee,
  TrendingDown,
  HelpCircle
} from "lucide-react";

interface AIAnalysis {
  estimatedValue: number;
  confidence: 'low' | 'medium' | 'high';
  factors: string[];
  analysis: string;
}

interface EstimateResultProps {
  value: number;
  analysis?: AIAnalysis;
  onReset: () => void;
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

const NearbyAmenities = [
  { icon: School, label: "Schools", distance: "0.3 miles" },
  { icon: Store, label: "Shops", distance: "0.5 miles" },
  { icon: Trees, label: "Parks", distance: "0.2 miles" },
  { icon: Hospital, label: "Hospital", distance: "1.2 miles" },
  { icon: Coffee, label: "Restaurants", distance: "0.4 miles" },
];

const EstimateResult: React.FC<EstimateResultProps> = ({ value, analysis, onReset }) => {
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

  const renderFactorIcon = (index: number) => {
    const icons = [
      <TrendingUp key="trend" className="text-[#FFD700]" />,
      <BarChart3 key="chart" className="text-[#FDB931]" />,
      <MapPin key="location" className="text-[#FFE5B4]" />,
      <HomeIcon key="home" className="text-[#FFD700]" />,
      <Info key="info" className="text-[#FDB931]" />
    ];
    return icons[index % icons.length];
  };

  return (
    <TooltipProvider>
      <Card className="w-full max-w-md mx-auto glass-panel animate-fade-up">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-light text-gradient">
            Your Estimated Property Value
          </CardTitle>
          <CardDescription className="text-lg">
            Based on AI analysis and market data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="text-center">
            <div className="text-5xl font-light mb-4 bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#FFE5B4] bg-clip-text text-transparent">
              {formatCurrency(value)}
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center justify-center gap-2 cursor-help">
                  <p className="text-sm text-muted-foreground">
                    Confidence Level:{" "}
                    <span className={`font-medium ${ConfidenceLevels[analysis?.confidence || 'medium'].color}`}>
                      {analysis?.confidence.toUpperCase()}
                    </span>
                  </p>
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  {ConfidenceLevels[analysis?.confidence || 'medium'].description}
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          
          {analysis && (
            <div className="space-y-6">
              {/* Market Trends */}
              <div className="space-y-4">
                <h3 className="font-medium text-gradient">Market Trends</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                    <TrendingUp className="text-green-400" />
                    <div>
                      <p className="text-sm font-medium">Price Trend</p>
                      <p className="text-xs text-muted-foreground">+5.2% YoY</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                    <BarChart3 className="text-blue-400" />
                    <div>
                      <p className="text-sm font-medium">Demand</p>
                      <p className="text-xs text-muted-foreground">High</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nearby Amenities */}
              <div className="space-y-4">
                <h3 className="font-medium text-gradient">Nearby Amenities</h3>
                <div className="grid gap-3">
                  {NearbyAmenities.map(({ icon: Icon, label, distance }, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                      <Icon className="text-[#FFD700]" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{label}</p>
                        <p className="text-xs text-muted-foreground">{distance}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Factors */}
              <div className="space-y-4">
                <h3 className="font-medium text-gradient">Key Factors</h3>
                <div className="grid gap-3">
                  {analysis.factors.slice(0, 5).map((factor, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm">
                      <div className="mt-0.5">
                        {renderFactorIcon(index)}
                      </div>
                      <p className="text-sm text-muted-foreground">{factor}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-medium text-gradient">Analysis</h3>
                <p className="text-sm text-muted-foreground leading-relaxed bg-white/5 backdrop-blur-sm p-4 rounded-lg">
                  {analysis.analysis}
                </p>
              </div>
            </div>
          )}
          
          <div className="space-y-4 pt-4">
            <p className="text-sm text-center text-muted-foreground">
              Would you like a more accurate valuation? Our expert estate agents can provide a detailed
              analysis of your property's worth.
            </p>
            <div className="flex flex-col gap-3">
              <Button
                variant="outline"
                className="hover:bg-white/10 transition-colors"
                onClick={() => window.open("mailto:contact@example.com", "_blank")}
              >
                Contact an Estate Agent
              </Button>
              <Button 
                variant="secondary"
                className="hover:bg-white/10 transition-colors" 
                onClick={onReset}
              >
                Get Another Estimate
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default EstimateResult;

