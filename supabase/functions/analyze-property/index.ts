
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

    console.log('Starting property analysis with Gemini:', { address, propertyType }); // Debug log

    const prompt = `You are a UK property valuation expert. Analyze this ${propertyType} at ${address}. Provide a valuation considering local market data, property characteristics, and market trends.

Return ONLY a JSON object in this EXACT format (no additional text, no markdown):
{
  "estimatedValue": [number representing property value in GBP],
  "confidence": ["low" or "medium" or "high"],
  "analysis": [brief explanation of valuation],
  "details": {
    "location": {
      "description": [area description],
      "amenities": [array of 3-5 nearby amenities]
    },
    "education": {
      "description": [education facilities description],
      "schools": [array of 2-3 nearby schools]
    },
    "transport": {
      "description": [transport links description],
      "links": [array of 2-3 transport options]
    },
    "marketActivity": {
      "recentSales": [recent sales activity description],
      "priceChanges": [price trends description]
    }
  }
}`;

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
          topK: 1,
          topP: 1,
          maxOutputTokens: 1000
        }
      })
    });

    const geminiData = await geminiResponse.json();
    console.log('Raw Gemini response:', JSON.stringify(geminiData, null, 2)); // Debug log

    if (!geminiData.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error('Invalid Gemini response structure:', geminiData);
      throw new Error('Invalid response structure from Gemini');
    }

    const rawContent = geminiData.candidates[0].content.parts[0].text;
    console.log('Raw content from Gemini:', rawContent); // Debug log

    // Clean and parse the response
    let parsedResponse;
    try {
      // First remove any markdown formatting if present
      const cleanJson = rawContent.replace(/```(?:json)?\n?|\n?```/g, '').trim();
      console.log('Cleaned JSON:', cleanJson); // Debug log
      
      parsedResponse = JSON.parse(cleanJson);
      console.log('Parsed response:', parsedResponse); // Debug log

      // Validate required fields
      if (typeof parsedResponse.estimatedValue !== 'number' ||
          !['low', 'medium', 'high'].includes(parsedResponse.confidence) ||
          !parsedResponse.details?.location?.description ||
          !Array.isArray(parsedResponse.details?.location?.amenities)) {
        throw new Error('Missing required fields in response');
      }
    } catch (parseError) {
      console.error('Parse error:', parseError);
      console.error('Failed content:', rawContent);
      throw new Error(`Failed to parse Gemini response: ${parseError.message}`);
    }

    return new Response(
      JSON.stringify(parsedResponse),
      {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error in analyze-property function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: "Failed to analyze property. Please try again."
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
