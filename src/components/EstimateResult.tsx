
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

  const renderAnalysisSection = () => {
    if (!analysis?.details) return null;

    const sections = [
      {
        icon: <MapPin className="w-5 h-5 text-blue-400" />,
        title: "Location",
        content: analysis.details.location.description
      },
      {
        icon: <School className="w-5 h-5 text-purple-400" />,
        title: "Education",
        content: analysis.details.education.description
      },
      {
        icon: <Bus className="w-5 h-5 text-green-400" />,
        title: "Transport",
        content: analysis.details.transport.description
      },
      {
        icon: <BarChart3 className="w-5 h-5 text-yellow-400" />,
        title: "Market Trends",
        content: analysis.details.marketActivity.priceChanges
      }
    ];

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {sections.map((section, index) => (
          <div 
            key={index}
            className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3 mb-2">
              {section.icon}
              <h3 className="font-medium text-white">{section.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {section.content}
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <TooltipProvider>
      <Card className="w-full max-w-2xl mx-auto glass-panel animate-fade-up">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-light text-gradient">
            Property Value Estimate
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center mb-4">
            <div className="text-5xl font-light mb-2 bg-gradient-to-r from-[#9b87f5] via-[#8B5CF6] to-[#D6BCFA] bg-clip-text text-transparent">
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
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-gradient-to-r from-white/5 to-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Landmark className="w-5 h-5 text-[#FFD700]" />
                  <h3 className="font-medium text-white">Recent Market Activity</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {analysis.details.marketActivity.recentSales}
                </p>
              </div>
              {renderAnalysisSection()}
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button
              variant="outline"
              className="flex-1 hover:bg-white/10 transition-colors"
              onClick={() => window.open("mailto:contact@example.com", "_blank")}
            >
              Contact an Estate Agent
            </Button>
            <Button 
              variant="secondary"
              className="flex-1 hover:bg-white/10 transition-colors" 
              onClick={onReset}
            >
              New Estimate
            </Button>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default EstimateResult;
