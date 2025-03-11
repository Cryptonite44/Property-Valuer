
export interface PropertyDetails {
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

export interface BuyerPersona {
  profile: string;
  demographics: {
    ageRange: string;
    occupation: string;
    householdType: string;
  };
  motivations: string[];
  preferences: string[];
  buyingPower: string;
}

export interface AIAnalysis {
  estimatedValue: {
    lower: number;
    upper: number;
  };
  confidence: 'low' | 'medium' | 'high';
  analysis: string;
  details: PropertyDetails;
  buyerPersona: BuyerPersona;
}
