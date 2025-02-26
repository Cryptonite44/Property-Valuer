
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

    const prompt = `As a UK property valuation expert, carefully analyze this ${propertyType} and provide a detailed valuation. 

Address: ${address}

Consider these CRUCIAL factors for an accurate valuation:
1. Recent property sales in the area (within last 12 months)
2. Current market conditions and trends
3. Location-specific factors (transport links, schools, amenities)
4. Property type and typical values for similar properties
5. Regional property market performance

IMPORTANT: The estimated value MUST be:
- In GBP (£)
- A realistic market value for the specific UK location
- Based on current market data
- Rounded to the nearest thousand
- Between £50,000 and £10,000,000

Respond ONLY with a JSON object (no markdown, no code blocks) matching this structure:
{
  "estimatedValue": number,
  "confidence": "low" | "medium" | "high",
  "analysis": "string explaining the valuation rationale",
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
      "recentSales": "string describing recent sales",
      "priceChanges": "string describing price trends"
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
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert UK property valuation AI with extensive knowledge of the UK property market, local areas, and current market conditions. Always provide realistic valuations based on actual market data and local property prices. Never provide valuations outside the range of £50,000 to £10,000,000.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7
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
        aiResponse.estimatedValue < 50000 || 
        aiResponse.estimatedValue > 10000000) {
      throw new Error('Invalid property valuation amount');
    }

    console.log('Parsed response:', aiResponse); // Debug log

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
