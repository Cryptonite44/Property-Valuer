
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

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

    console.log('Starting property analysis with Gemini:', { address, propertyType });

    const prompt = `As a UK property expert, provide the exact average house price for a ${propertyType} at ${address}. Use ONLY actual market data, not estimates. Return ONLY the following JSON (no additional text):

{
  "estimatedValue": [current average price as a number],
  "confidence": "medium",
  "analysis": "Based on current market data in ${address}",
  "details": {
    "location": {
      "description": "Brief area description",
      "amenities": ["Local shops", "Parks", "Healthcare"]
    },
    "education": {
      "description": "Local education facilities",
      "schools": ["Primary School", "Secondary School"]
    },
    "transport": {
      "description": "Transport connections",
      "links": ["Bus routes", "Train station"]
    },
    "marketActivity": {
      "recentSales": "Recent sales in the area",
      "priceChanges": "Market trends"
    }
  }
}`;

    try {
      const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${geminiApiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 1000,
          }
        })
      });

      if (!geminiResponse.ok) {
        throw new Error('Gemini API request failed');
      }

      const geminiData = await geminiResponse.json();
      console.log('Raw Gemini response:', JSON.stringify(geminiData, null, 2));

      if (!geminiData.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error('Invalid Gemini response format');
      }

      const rawContent = geminiData.candidates[0].content.parts[0].text;
      console.log('Raw content:', rawContent);

      const cleanJson = rawContent.replace(/```(?:json)?\n?|\n?```/g, '').trim();
      console.log('Cleaned JSON:', cleanJson);

      const parsedResponse = JSON.parse(cleanJson);
      console.log('Parsed response:', parsedResponse);

      // Simple validation
      if (typeof parsedResponse.estimatedValue !== 'number') {
        throw new Error('Invalid value format');
      }

      return new Response(
        JSON.stringify(parsedResponse),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } catch (apiError) {
      console.error('API or parsing error:', apiError);
      throw new Error('Failed to process property data');
    }

  } catch (error) {
    console.error('Error in analyze-property function:', error);
    
    // Return a more detailed error response
    return new Response(
      JSON.stringify({
        error: error.message,
        details: "Failed to analyze property. Please try again."
      }),
      {
        status: 200, // Changed to 200 to prevent client-side rejection
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
