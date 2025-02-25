
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { address, propertyType } = await req.json()
    console.log(`Analysing property: ${address} (${propertyType})`)

    // First, let's ask GPT to research the property and area
    const researchResponse = await fetch('https://api.openai.com/v1/chat/completions', {
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
            content: `You are a UK property expert with access to current market data. 
            Research the given address and:
            1. Find recent sale prices of similar properties in the area
            2. Consider local amenities, transport links, and schools
            3. Analyse current market conditions for that specific postcode
            4. Look for any recent developments or changes in the area
            Return ONLY the key facts you find, separated by semicolons.`
          },
          {
            role: 'user',
            content: `Research this property and its area: ${address}`
          }
        ],
      }),
    });

    const researchData = await researchResponse.json();
    const researchFacts = researchData.choices[0].message.content;

    // Now, use these facts to generate a valuation
    const valuationResponse = await fetch('https://api.openai.com/v1/chat/completions', {
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
            content: `You are a UK property valuation expert. Based on the provided research data,
            generate a property valuation with:
            1. A specific estimated value (not a range)
            2. A confidence level (low/medium/high) based on data quality
            3. A brief, specific analysis focusing on this property
            Format: JSON object with estimatedValue (number), confidence (string), and analysis (string).
            Use British English. Be specific to this property.`
          },
          {
            role: 'user',
            content: `Property: ${address}
            Type: ${propertyType}
            Research data: ${researchFacts}`
          }
        ],
      }),
    });

    const valuationData = await valuationResponse.json();
    let valuation;
    try {
      valuation = JSON.parse(valuationData.choices[0].message.content);
    } catch (e) {
      console.error('Failed to parse valuation response:', e);
      // Fallback to extracting just the text if JSON parsing fails
      valuation = {
        estimatedValue: 0,
        confidence: 'low',
        analysis: valuationData.choices[0].message.content
      };
    }

    // Log for debugging
    console.log('Research facts:', researchFacts);
    console.log('Valuation:', valuation);

    // Format the final response
    const analysis = {
      estimatedValue: valuation.estimatedValue || 0,
      confidence: (valuation.confidence || 'low') as 'low' | 'medium' | 'high',
      factors: researchFacts.split(';').filter(Boolean).slice(0, 3),
      analysis: valuation.analysis || 'Unable to generate detailed analysis'
    };

    return new Response(
      JSON.stringify(analysis),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 },
    )
  }
});
