
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

    console.log('Analyzing property:', { address, propertyType }); // Debug log

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
            content: 'You are a UK property valuation expert. Return the exact valuation you calculate without any modifications or rounding.'
          },
          {
            role: 'user',
            content: prompt
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

    const rawContent = data.choices[0].message.content;
    console.log('Raw content from ChatGPT:', rawContent); // Debug log

    const cleanedContent = extractJSONFromMarkdown(rawContent);
    console.log('Cleaned JSON content:', cleanedContent); // Debug log

    const aiResponse = JSON.parse(cleanedContent);
    console.log('Parsed AI response:', aiResponse); // Debug log
    
    if (!aiResponse.estimatedValue || typeof aiResponse.estimatedValue !== 'number') {
      throw new Error('Invalid property valuation amount');
    }

    // Return the exact ChatGPT response without any modification
    const response_data = {
      ...aiResponse,
      estimatedValue: aiResponse.estimatedValue // Ensure we use the exact value
    };

    console.log('Final response being sent:', response_data); // Debug log

    return new Response(JSON.stringify(response_data), {
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
