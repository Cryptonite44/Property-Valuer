
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
if (!openAIApiKey) {
  throw new Error('OPENAI_API_KEY environment variable is not set');
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { address } = await req.json();
    console.log('Analyzing address:', address);

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
            content: 'You are a UK real estate expert. Analyze property values based on historical data and market trends. Respond ONLY with a JSON object containing estimatedValue (number), confidence (low/medium/high), factors (array of strings), and analysis (string).'
          },
          {
            role: 'user',
            content: `Analyze this UK property value: ${address}

            Consider:
            1. Historical sales data (last 5 years)
            2. Apply 5% annual appreciation to past sales
            3. Recent sales of similar properties
            4. Local market trends
            5. Area developments

            Return ONLY a JSON object in this format:
            {
              "estimatedValue": number,
              "confidence": "low"|"medium"|"high",
              "factors": string[],
              "analysis": string
            }`
          }
        ],
        temperature: 0.7
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get AI analysis');
    }

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);

    // Validate the response
    if (typeof result.estimatedValue !== 'number' || 
        !['low', 'medium', 'high'].includes(result.confidence) ||
        !Array.isArray(result.factors) ||
        typeof result.analysis !== 'string') {
      throw new Error('Invalid AI response format');
    }

    console.log('Successfully analyzed property');
    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({
        error: error.message,
        estimatedValue: 0,
        confidence: "low",
        factors: ["Error analyzing property"],
        analysis: "Unable to complete analysis. Please try again."
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
