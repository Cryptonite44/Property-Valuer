
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

    const prompt = `As a UK property valuation expert, provide the exact current market value for this ${propertyType} at ${address}. Consider recent sales data, local market conditions, and property characteristics. Return your response EXACTLY in this JSON format, with no additional text or formatting:

{
  "estimatedValue": number,
  "confidence": "low" | "medium" | "high",
  "analysis": "string explaining the valuation rationale",
  "details": {
    "location": {
      "description": "string describing the area",
      "amenities": ["array of nearby amenities"]
    },
    "education": {
      "description": "string describing educational facilities",
      "schools": ["array of nearby schools"]
    },
    "transport": {
      "description": "string describing transport links",
      "links": ["array of transport options"]
    },
    "marketActivity": {
      "recentSales": "string describing recent sales",
      "priceChanges": "string describing price trends"
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
          topP: 1
        }
      })
    });

    const geminiData = await geminiResponse.json();
    console.log('Raw Gemini response:', geminiData); // Debug log

    if (!geminiData.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error('Invalid Gemini response structure:', geminiData);
      throw new Error('Invalid response structure from Gemini');
    }

    const rawContent = geminiData.candidates[0].content.parts[0].text;
    console.log('Raw content from Gemini:', rawContent); // Debug log

    let parsedResponse;
    try {
      // Remove any potential markdown formatting and parse JSON
      const cleanJson = rawContent.replace(/```json\n?|\n?```/g, '').trim();
      parsedResponse = JSON.parse(cleanJson);
      console.log('Successfully parsed Gemini response:', parsedResponse); // Debug log
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', parseError);
      console.error('Content that failed to parse:', rawContent);
      throw new Error('Failed to parse Gemini response');
    }

    // Validate the response structure
    if (!parsedResponse || typeof parsedResponse.estimatedValue !== 'number') {
      console.error('Invalid response structure:', parsedResponse);
      throw new Error('Invalid response structure from Gemini');
    }

    // Create a new Response with the exact parsed data
    const finalResponse = new Response(
      JSON.stringify(parsedResponse),
      {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json'
        }
      }
    );

    // Log the actual response being sent
    const responseClone = finalResponse.clone();
    const responseBody = await responseClone.json();
    console.log('Final response being sent:', responseBody);

    return finalResponse;
  } catch (error) {
    console.error('Error in analyze-property function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
