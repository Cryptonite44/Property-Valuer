
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

    console.log('Sending prompt to OpenAI:', prompt);

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
            content: 'You are a UK property valuation expert. Always respond with valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3 // Reduced temperature for more consistent results
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
    console.log('Parsed response object:', JSON.stringify(parsed, null, 2));

    // Validate the essential fields
    if (!parsed || typeof parsed.estimatedValue !== 'number') {
      console.error('Validation failed:', parsed);
      throw new Error('Invalid response format - missing or invalid estimatedValue');
    }

    console.log('Final response being sent:', JSON.stringify(parsed, null, 2));

    // Return the exact parsed response from ChatGPT without any modifications
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
