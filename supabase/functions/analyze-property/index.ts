
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
            content: `You are a UK property expert. Research the given address and provide:
            1. Recent sale prices of similar properties (last 12 months)
            2. Local amenities and transport links
            3. Current market conditions for the postcode
            Format as bullet points, each starting with a dash (-).`
          },
          {
            role: 'user',
            content: `Research this property: ${address}`
          }
        ],
        temperature: 0.7,
      }),
    });

    const researchData = await researchResponse.json();
    if (!researchData.choices?.[0]?.message?.content) {
      throw new Error('Failed to get research data');
    }
    
    const researchFacts = researchData.choices[0].message.content;
    console.log('Research facts:', researchFacts);

    // Now generate the valuation with more structured prompt
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
            content: `You are a UK property valuation expert. Generate a valuation response in this exact JSON format:
            {
              "estimatedValue": number (no currency symbol, just the number),
              "confidence": "low" or "medium" or "high",
              "analysis": "a single paragraph summary"
            }`
          },
          {
            role: 'user',
            content: `Based on this research data, provide a valuation for ${propertyType} at ${address}:
            
            ${researchFacts}`
          }
        ],
        temperature: 0.2,
      }),
    });

    const valuationData = await valuationResponse.json();
    if (!valuationData.choices?.[0]?.message?.content) {
      throw new Error('Failed to get valuation');
    }

    let valuation;
    try {
      // Clean up the response to ensure it's valid JSON
      const cleanJson = valuationData.choices[0].message.content
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      
      valuation = JSON.parse(cleanJson);
      
      // Validate the required fields
      if (!valuation.estimatedValue || !valuation.confidence || !valuation.analysis) {
        throw new Error('Missing required fields in valuation');
      }
      
      // Ensure confidence is one of the allowed values
      if (!['low', 'medium', 'high'].includes(valuation.confidence)) {
        valuation.confidence = 'medium';
      }
      
      // Ensure estimatedValue is a number
      valuation.estimatedValue = Number(valuation.estimatedValue);
      if (isNaN(valuation.estimatedValue)) {
        throw new Error('Invalid estimated value');
      }
    } catch (e) {
      console.error('Error parsing valuation:', e);
      throw new Error('Failed to parse valuation data');
    }

    // Format the final response
    const analysis = {
      estimatedValue: valuation.estimatedValue,
      confidence: valuation.confidence as 'low' | 'medium' | 'high',
      factors: researchFacts.split('-')
        .map(fact => fact.trim())
        .filter(fact => fact.length > 0)
        .slice(0, 3),
      analysis: valuation.analysis
    };

    console.log('Final analysis:', analysis);
    
    return new Response(
      JSON.stringify(analysis),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Failed to analyze property. Please try again.'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      },
    )
  }
});
