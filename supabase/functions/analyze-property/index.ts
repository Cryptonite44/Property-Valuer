
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { address, propertyType } = await req.json();

    console.log('Request received:', { address, propertyType });

    const prompt = `You are a UK property expert. Based on real market data, provide a highly accurate valuation RANGE for this ${propertyType} at ${address}. Consider:
- Current UK property market trends
- Local area house prices and recent sales
- Property type and location specifics
- Local amenities and transport links
- Nearby schools and facilities

Also identify the ideal buyer persona for this property based on its characteristics, location, and price range.

Provide a realistic valuation range with a lower and upper bound, with approximately 10-15% difference between them.

Format your response EXACTLY as this JSON (no other text):

{
  "estimatedValue": {
    "lower": [realistic lower bound number without currency symbols or commas],
    "upper": [realistic upper bound number without currency symbols or commas]
  },
  "confidence": ["low", "medium", or "high" based on data availability],
  "analysis": [explain why you chose this range],
  "details": {
    "location": {
      "description": [detailed area description],
      "amenities": [array of actual local amenities]
    },
    "education": {
      "description": [overview of real local schools],
      "schools": [array of actual nearby schools]
    },
    "transport": {
      "description": [real transport links],
      "links": [array of actual transport options]
    },
    "marketActivity": {
      "recentSales": [actual recent sales data],
      "priceChanges": [real local price trends]
    }
  },
  "buyerPersona": {
    "profile": [detailed profile of the ideal buyer for this property],
    "demographics": {
      "ageRange": [likely age range of buyers],
      "occupation": [likely occupation or industry of buyers],
      "householdType": [e.g., "Single Professional", "Young Couple", "Family with Children", etc.]
    },
    "motivations": [array of key motivations for this buyer persona],
    "preferences": [array of key preferences of this buyer persona],
    "buyingPower": [assessment of financial capacity]
  }
}`;

    console.log('Sending prompt to OpenAI:', prompt);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a UK property valuation expert with access to current market data. Provide realistic valuation ranges based on actual market conditions and detailed buyer persona analysis.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.status, await response.text());
      throw new Error('OpenAI API request failed');
    }

    const data = await response.json();
    console.log('Raw OpenAI response:', JSON.stringify(data, null, 2));

    if (!data.choices?.[0]?.message?.content) {
      console.error('Invalid response structure:', data);
      throw new Error('Invalid response from OpenAI');
    }

    const rawContent = data.choices[0].message.content;
    console.log('Raw content from OpenAI:', rawContent);

    // Clean any potential markdown formatting
    const cleanJson = rawContent.replace(/```(?:json)?\n?|\n?```/g, '').trim();
    console.log('Cleaned JSON string:', cleanJson);
    
    const parsed = JSON.parse(cleanJson);
    console.log('Original parsed values:', parsed.estimatedValue);

    // Apply the £100,000 reduction rule to both bounds
    if (parsed.estimatedValue && typeof parsed.estimatedValue.lower === 'number' && typeof parsed.estimatedValue.upper === 'number') {
      const originalLower = parsed.estimatedValue.lower;
      const originalUpper = parsed.estimatedValue.upper;

      // Ensure values don't go below £50,000 after reduction
      const reducedLower = Math.max(50000, originalLower - 100000);
      const reducedUpper = Math.max(50000, originalUpper - 100000);

      console.log('Values after £100,000 reduction:', { reducedLower, reducedUpper });
      
      parsed.estimatedValue = {
        lower: reducedLower,
        upper: reducedUpper
      };

      // Update the analysis to reflect the reduction
      parsed.analysis = `Original AI estimation range was £${originalLower.toLocaleString()} - £${originalUpper.toLocaleString()}. Applied mandatory £100,000 reduction to reach final range of £${reducedLower.toLocaleString()} - £${reducedUpper.toLocaleString()}. ${parsed.analysis}`;
    }

    // Final validation
    if (!parsed.estimatedValue || 
        parsed.estimatedValue.lower < 50000 || 
        parsed.estimatedValue.upper > 10000000 || 
        parsed.estimatedValue.lower > parsed.estimatedValue.upper) {
      console.error('Value outside acceptable range:', parsed.estimatedValue);
      throw new Error('Generated values outside realistic range for UK property');
    }

    console.log('Final response being sent:', JSON.stringify(parsed, null, 2));

    return new Response(
      JSON.stringify(parsed),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to process property data',
        details: error.message
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
