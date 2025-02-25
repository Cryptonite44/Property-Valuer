
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
    console.log('Received address:', address);

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

    You must respond with valid JSON in this exact format:
    {
      "estimatedValue": <number>,
      "confidence": "low" | "medium" | "high",
      "factors": [<string array of factors>],
      "analysis": "<string explanation>"
    }`;

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
            content: 'You are a UK real estate expert. You MUST respond with properly formatted JSON containing an estimatedValue (number), confidence (string), factors (array of strings), and analysis (string).'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error('Failed to get AI analysis');
    }

    const aiResponse = await response.json();
    console.log('Raw AI response:', aiResponse.choices[0].message.content);

    let analysis;
    try {
      analysis = JSON.parse(aiResponse.choices[0].message.content);
      
      // Validate the response format
      if (!analysis.estimatedValue || !analysis.confidence || !analysis.factors || !analysis.analysis) {
        throw new Error('Invalid response format from AI');
      }

      // Ensure estimatedValue is a number
      analysis.estimatedValue = Number(analysis.estimatedValue);
      if (isNaN(analysis.estimatedValue)) {
        throw new Error('Invalid estimated value');
      }

      // Ensure confidence is one of the allowed values
      if (!['low', 'medium', 'high'].includes(analysis.confidence)) {
        analysis.confidence = 'medium';
      }

      // Ensure factors is an array
      if (!Array.isArray(analysis.factors)) {
        analysis.factors = [analysis.factors.toString()];
      }

      console.log('Validated analysis:', analysis);
    } catch (error) {
      console.error('Error parsing AI response:', error);
      throw new Error('Failed to parse AI response');
    }

    return new Response(
      JSON.stringify(analysis),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Error:', error.message);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        estimatedValue: 0,
        confidence: "low",
        factors: ["Error in analysis"],
        analysis: "Failed to analyze property. Please try again."
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});
