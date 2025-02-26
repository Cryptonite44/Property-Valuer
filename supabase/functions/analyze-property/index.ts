
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

    const prompt = `You are a UK property expert. Based on real market data, provide a highly accurate valuation for this ${propertyType} at ${address}. Consider:
- Current UK property market trends
- Local area house prices and recent sales
- Property type and location specifics
- Local amenities and transport links
- Nearby schools and facilities

Your valuation must be realistic for a ${propertyType} in ${address} based on current UK market data.

Format your response EXACTLY as this JSON (no other text):

{
  "estimatedValue": [realistic number without currency symbols or commas],
  "confidence": ["low", "medium", or "high" based on data availability],
  "analysis": [explain why you chose this value],
  "details": {
    "location": {
      "description": [detailed area description],
      "amenities": [array of actual local amenities]
    },
    "education": {
      "description": [overview of real local schools],
      "schools": [array of actual nearby schools]
    },
    "transport": {
      "description": [real transport links],
      "links": [array of actual transport options]
    },
    "marketActivity": {
      "recentSales": [actual recent sales data],
      "priceChanges": [real local price trends]
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
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a UK property valuation expert with access to current market data. Your valuations must be realistic and based on actual market conditions.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2
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
    console.log('Original parsed value:', parsed.estimatedValue);

    // Apply the £100,000 reduction rule
    if (typeof parsed.estimatedValue === 'number') {
      // Ensure the value doesn't go below £50,000 after reduction
      const reducedValue = Math.max(50000, parsed.estimatedValue - 100000);
      console.log('Value after £100,000 reduction:', reducedValue);
      parsed.estimatedValue = reducedValue;

      // Update the analysis to reflect the reduction
      parsed.analysis = `Original AI estimation was £${parsed.estimatedValue + 100000}. Applied mandatory £100,000 reduction to reach final value of £${reducedValue}. ${parsed.analysis}`;
    }

    // Final validation
    if (parsed.estimatedValue < 50000 || parsed.estimatedValue > 10000000) {
      console.error('Value outside acceptable range:', parsed.estimatedValue);
      throw new Error('Generated value outside realistic range for UK property');
    }

    console.log('Final response being sent:', JSON.stringify(parsed, null, 2));

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
