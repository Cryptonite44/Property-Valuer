
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
            content: `You are a UK property expert. For the given address, provide a JSON response in this exact format:
            {
              "location": {
                "description": "Brief description of location benefits",
                "amenities": ["List", "of", "key", "amenities"]
              },
              "education": {
                "description": "Description of nearby schools and education facilities",
                "schools": ["List", "of", "nearby", "schools"]
              },
              "transport": {
                "description": "Overview of transport links",
                "links": ["List", "of", "transport", "options"]
              },
              "marketActivity": {
                "recentSales": "Details of recent sales in the area",
                "priceChanges": "Recent price trends percentage"
              }
            }`
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
    
    let propertyDetails;
    try {
      propertyDetails = JSON.parse(researchData.choices[0].message.content);
    } catch (e) {
      console.error('Failed to parse research data:', e);
      throw new Error('Failed to analyze property details');
    }

    // Now generate the valuation based on the research
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
              "analysis": "brief summary of valuation reasoning"
            }`
          },
          {
            role: 'user',
            content: `Based on this research data, provide a valuation for ${propertyType} at ${address}:
            ${JSON.stringify(propertyDetails, null, 2)}`
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
      const cleanJson = valuationData.choices[0].message.content
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      
      valuation = JSON.parse(cleanJson);
      
      if (!valuation.estimatedValue || !valuation.confidence || !valuation.analysis) {
        throw new Error('Missing required fields in valuation');
      }
      
      valuation.estimatedValue = Number(valuation.estimatedValue);
      if (isNaN(valuation.estimatedValue)) {
        throw new Error('Invalid estimated value');
      }
    } catch (e) {
      console.error('Error parsing valuation:', e);
      throw new Error('Failed to parse valuation data');
    }

    // Combine the research and valuation data
    const analysis = {
      estimatedValue: valuation.estimatedValue,
      confidence: valuation.confidence as 'low' | 'medium' | 'high',
      analysis: valuation.analysis,
      details: propertyDetails
    };

    console.log('Final analysis:', analysis);
    
    return new Response(
      JSON.stringify(analysis),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 },
    )
  }
});
