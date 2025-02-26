
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

    console.log('Starting property analysis for:', { address, propertyType }); // Debug log

    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: `Provide the exact current market value for this ${propertyType} at ${address}. Return ONLY a JSON response with this exact structure:

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
}`
          }
        ],
        temperature: 0.1
      }),
    });

    const openAIData = await openAIResponse.json();
    console.log('Raw OpenAI response:', openAIData); // Debug log

    if (!openAIData.choices?.[0]?.message?.content) {
      throw new Error('Invalid response structure from OpenAI');
    }

    const chatGPTContent = openAIData.choices[0].message.content;
    console.log('ChatGPT raw content:', chatGPTContent); // Debug log

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(chatGPTContent);
      console.log('Successfully parsed ChatGPT response:', parsedResponse); // Debug log
    } catch (parseError) {
      console.error('Failed to parse ChatGPT response:', parseError);
      throw new Error('Failed to parse ChatGPT response');
    }

    // Validate the response structure
    if (!parsedResponse || typeof parsedResponse.estimatedValue !== 'number') {
      console.error('Invalid response structure:', parsedResponse);
      throw new Error('Invalid response structure from ChatGPT');
    }

    // Create a new Response with the EXACT parsed data from ChatGPT
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
