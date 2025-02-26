
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function extractJSONFromMarkdown(text: string): string {
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  return jsonMatch ? jsonMatch[1] : text;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { address, propertyType } = await req.json();

    const prompt = `You are tasked with providing an accurate valuation for this UK property:

${propertyType} at: ${address}

Based on your knowledge of the UK property market:
1. What is the EXACT current market value of this property?
2. Use recent sales data, market conditions, and local factors
3. The value must be precise and not rounded
4. Must be based on actual property data from the area

CRITICAL: Your response must ONLY include a JSON object with this structure:
{
  "estimatedValue": number (exact value, not rounded),
  "confidence": "low" | "medium" | "high",
  "analysis": "detailed explanation of how you arrived at this specific value",
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
      "recentSales": "string with specific recent sales data",
      "priceChanges": "string with specific price trends"
    }
  }
}`;

    console.log('Sending request to OpenAI...'); // Debug log

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a UK property valuation expert with access to current market data. Always provide precise, unrounded valuations based on actual market data. Your valuations must be exact numbers.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.1 // Lower temperature for more consistent, precise responses
      }),
    });

    const data = await response.json();
    console.log('OpenAI raw response:', data); // Debug log

    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response from OpenAI');
    }

    const rawContent = data.choices[0].message.content;
    console.log('Raw content:', rawContent); // Debug log

    // Clean up the response content
    const cleanedContent = extractJSONFromMarkdown(rawContent);
    console.log('Cleaned content:', cleanedContent); // Debug log

    // Parse the cleaned JSON
    const aiResponse = JSON.parse(cleanedContent);
    
    // Validate the response
    if (!aiResponse.estimatedValue || 
        typeof aiResponse.estimatedValue !== 'number' || 
        aiResponse.estimatedValue < 50000 || 
        aiResponse.estimatedValue > 10000000) {
      throw new Error('Invalid property valuation amount');
    }

    // Return the exact value from ChatGPT without any modifications
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
