
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

    // Craft a detailed prompt for the AI
    const prompt = `As a professional property valuation expert, analyze this ${propertyType} and provide a detailed valuation with supporting information.

Address: ${address}

Please provide:
1. An accurate estimated value in GBP (£)
2. Brief analysis of the valuation
3. Details about:
   - Location and amenities
   - Local education facilities
   - Transport links
   - Recent market activity

Format your response as a JSON object with these exact fields:
{
  "estimatedValue": number,
  "confidence": "low" | "medium" | "high",
  "analysis": "string",
  "details": {
    "location": {
      "description": "string",
      "amenities": ["string"]
    },
    "education": {
      "description": "string",
      "schools": ["string"]
    },
    "transport": {
      "description": "string",
      "links": ["string"]
    },
    "marketActivity": {
      "recentSales": "string",
      "priceChanges": "string"
    }
  }
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert property valuation AI that provides detailed analysis and accurate valuations based on current market data. Always respond with properly formatted JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7
      }),
    });

    const data = await response.json();
    const aiResponse = JSON.parse(data.choices[0].message.content);

    // Ensure the response is properly formatted
    return new Response(JSON.stringify(aiResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in analyze-property function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
