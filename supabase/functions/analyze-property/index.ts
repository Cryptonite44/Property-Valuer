
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

    console.log('Analyzing property:', { address, propertyType }); // Debug log

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
            role: 'user',
            content: `What is the exact current market value of this ${propertyType} at ${address}? Consider recent sales data and local market conditions. Provide ONLY a JSON response with this structure, no other text:

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

    const data = await response.json();
    console.log('Raw OpenAI response:', data); // Debug log

    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response from OpenAI');
    }

    const content = data.choices[0].message.content;
    console.log('Raw content from ChatGPT:', content); // Debug log

    // Parse the JSON response directly
    const aiResponse = JSON.parse(content);
    console.log('Parsed AI response:', aiResponse); // Debug log

    // Return the exact ChatGPT response without any modification
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
