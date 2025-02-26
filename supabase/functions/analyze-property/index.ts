
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function extractJSONFromMarkdown(text: string): string {
  // Remove markdown code block indicators if present
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  return jsonMatch ? jsonMatch[1] : text;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { address, propertyType } = await req.json();

    // Craft a detailed prompt for the AI
    const prompt = `As a professional property valuation expert, analyze this ${propertyType} and provide a detailed valuation with supporting information.

Address: ${address}

Analyze the property and respond ONLY with a JSON object (no markdown, no code blocks) that matches this exact structure:
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
            content: 'You are an expert property valuation AI. Always respond with ONLY a JSON object, no markdown formatting or code blocks.'
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
