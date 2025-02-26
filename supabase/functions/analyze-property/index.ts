
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

    console.log('Starting property analysis:', { address, propertyType });

    const prompt = `You are a UK property expert. Analyze this ${propertyType} at ${address} and provide a detailed response with:
1. Estimated value
2. Local area description and amenities
3. Nearby schools and education facilities
4. Transport links and accessibility
5. Recent market activity and price trends

Format your response EXACTLY as this JSON (no other text):

{
  "estimatedValue": [number without currency symbols or commas],
  "confidence": "medium",
  "analysis": [brief market analysis],
  "details": {
    "location": {
      "description": [detailed area description],
      "amenities": [array of key local amenities]
    },
    "education": {
      "description": [overview of educational facilities],
      "schools": [array of nearby schools]
    },
    "transport": {
      "description": [overview of transport links],
      "links": [array of transport options]
    },
    "marketActivity": {
      "recentSales": [description of recent sales],
      "priceChanges": [description of price trends]
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
            content: 'You are a UK property valuation expert with detailed knowledge of local areas, schools, transport, and market trends. Always respond with valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error status:', response.status);
      throw new Error('OpenAI API request failed');
    }

    const data = await response.json();
    console.log('OpenAI raw response:', data);

    if (!data.choices?.[0]?.message?.content) {
      console.error('Invalid response structure:', data);
      throw new Error('Invalid response from OpenAI');
    }

    const rawContent = data.choices[0].message.content;
    console.log('Raw content from OpenAI:', rawContent);

    // Clean the response and parse it
    const cleanJson = rawContent.replace(/```(?:json)?\n?|\n?```/g, '').trim();
    console.log('Cleaned JSON:', cleanJson);
    
    const parsed = JSON.parse(cleanJson);
    console.log('Parsed response:', parsed);

    // Validate the response format
    if (!parsed || typeof parsed.estimatedValue !== 'number') {
      throw new Error('Invalid response format');
    }

    // Use all the details from ChatGPT's response
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
        estimatedValue: 250000,
        confidence: "low",
        analysis: "Unable to process detailed analysis at this time",
        details: {
          location: {
            description: "Area information temporarily unavailable",
            amenities: ["Local amenities data unavailable"]
          },
          education: {
            description: "Education information temporarily unavailable",
            schools: ["School data unavailable"]
          },
          transport: {
            description: "Transport information temporarily unavailable",
            links: ["Transport data unavailable"]
          },
          marketActivity: {
            recentSales: "Sales data temporarily unavailable",
            priceChanges: "Market trend data unavailable"
          }
        }
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
