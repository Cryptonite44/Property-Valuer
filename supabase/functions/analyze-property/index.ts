
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabase } from "../_shared/supabase-client.ts";

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
    const { address, propertyType, bedrooms, size } = await req.json();

    // First, query our database for similar properties
    const { data: existingProperties } = await supabase
      .from('house_prices')
      .select('price, postcode, property_type, bedrooms, size_sqm')
      .limit(5);

    // Create a prompt for OpenAI
    const prompt = `As a real estate expert, analyze this property:
    Address: ${address}
    Type: ${propertyType}
    Bedrooms: ${bedrooms}
    Size: ${size} sq meters

    Similar properties in our database:
    ${existingProperties?.map(p => 
      `${p.property_type}, ${p.bedrooms} beds, ${p.size_sqm}sqm, £${p.price}`
    ).join('\n')}

    Based on this data and your knowledge of the UK property market:
    1. What's the estimated market value?
    2. What are the key factors affecting the price?
    3. How confident are you in this estimate (low/medium/high)?

    Format your response as JSON with these fields:
    {
      "estimatedValue": number,
      "confidence": "low"|"medium"|"high",
      "factors": string[],
      "analysis": string
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
            content: 'You are a UK real estate expert. Analyze properties and provide market valuations based on location, type, and market data. Be precise and factual.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
      }),
    });

    const aiResponse = await response.json();
    const analysis = JSON.parse(aiResponse.choices[0].message.content);

    return new Response(
      JSON.stringify(analysis),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});
