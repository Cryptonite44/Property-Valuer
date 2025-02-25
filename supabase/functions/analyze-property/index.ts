
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabase } from "../_shared/supabase-client.ts";

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

    // Create a prompt for OpenAI that focuses on historical sales data
    const prompt = `As a UK real estate expert, analyze this property:
    Address: ${address}

    Please:
    1. Consider any historical sales data for this exact property in the last 5 years
    2. If historical data exists, apply a 5% annual appreciation to the last sale price
    3. Look at recent sales of similar properties in the same area/postcode
    4. Consider current market conditions and local area trends
    5. Factor in any recent local developments or changes that might affect value

    Important guidelines:
    - If you find historical sales data, mention when it was last sold and for how much
    - Apply 5% annual appreciation to historical prices when estimating current value
    - Consider local market trends and similar property sales
    - Explain your confidence level based on data availability

    Format your response as JSON with these fields:
    {
      "estimatedValue": number,
      "confidence": "low"|"medium"|"high",
      "factors": string[],
      "analysis": string
    }

    Include in the analysis when the property was last sold (if you find this information) and how you calculated the current estimate.`;

    console.log('Sending request to OpenAI...');
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
            content: 'You are a UK real estate expert with access to historical sales data. Focus on finding historical sales data and applying appropriate appreciation rates to estimate current values.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error('Failed to get AI analysis');
    }

    const aiResponse = await response.json();
    const analysis = JSON.parse(aiResponse.choices[0].message.content);

    console.log('Analysis completed successfully');
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
