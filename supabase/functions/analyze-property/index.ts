
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

    const prompt = `You are a UK property valuation expert. For the ${propertyType} at ${address}, search your knowledge and provide:
1. The EXACT average house price for this specific area based on recent market data.
2. Use ONLY actual market data, not estimates.
3. For the JSON response, use this EXACT average price as the estimatedValue.

Return your response in this exact JSON format (no markdown, no additional text):
{
  "estimatedValue": [the exact average price as a number without currency symbols or commas],
  "confidence": "medium",
  "analysis": "Based on current market data, this is the average property value in this area",
  "details": {
    "location": {
      "description": "Brief area description",
      "amenities": ["3-4 key local amenities"]
    },
    "education": {
      "description": "Brief education overview",
      "schools": ["2-3 nearby schools"]
    },
    "transport": {
      "description": "Brief transport overview",
      "links": ["2-3 transport options"]
    },
    "marketActivity": {
      "recentSales": "Recent sales summary",
      "priceChanges": "Price trends summary"
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

    if (!geminiResponse.ok) {
      console.error('Gemini API error:', await geminiResponse.text());
      throw new Error('Failed to get response from Gemini API');
    }

    const geminiData = await geminiResponse.json();
    console.log('Raw Gemini response:', JSON.stringify(geminiData, null, 2));

    if (!geminiData.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error('Invalid Gemini response structure:', geminiData);
      throw new Error('Invalid response structure from Gemini');
    }

    const rawContent = geminiData.candidates[0].content.parts[0].text;
    console.log('Raw content from Gemini:', rawContent);

    let parsedResponse;
    try {
      const cleanJson = rawContent.replace(/```(?:json)?\n?|\n?```/g, '').trim();
      console.log('Cleaned JSON:', cleanJson);
      
      parsedResponse = JSON.parse(cleanJson);
      console.log('Parsed response:', parsedResponse);

      // Validate the estimated value is a number
      if (typeof parsedResponse.estimatedValue !== 'number') {
        console.error('Invalid estimated value:', parsedResponse.estimatedValue);
        throw new Error('Invalid estimated value in response');
      }

      // Basic validation of required structure
      if (!parsedResponse.confidence || !parsedResponse.details) {
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
