
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const { address, propertyType } = await req.json();
    
    if (!address || !propertyType) {
      return new Response(
        JSON.stringify({ error: 'Address and property type are required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    console.log(`Analysing property: ${address} (${propertyType})`);

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
            content: `You are a UK property expert. For the given address, provide a JSON response with this structure:
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

    if (!researchResponse.ok) {
      throw new Error('Failed to get research data from OpenAI');
    }

    const researchData = await researchResponse.json();
    
    if (!researchData.choices?.[0]?.message?.content) {
      throw new Error('Invalid research response format');
    }

    let propertyDetails;
    try {
      const cleanJson = researchData.choices[0].message.content
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      propertyDetails = JSON.parse(cleanJson);
    } catch (e) {
      console.error('Failed to parse research data:', e);
      throw new Error('Failed to analyze property details');
    }

    // Generate valuation
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
            content: `You are a UK property valuation expert. Generate a valuation response with this structure:
            {
              "estimatedValue": number (no currency symbol),
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

    if (!valuationResponse.ok) {
      throw new Error('Failed to get valuation from OpenAI');
    }

    const valuationData = await valuationResponse.json();
    
    if (!valuationData.choices?.[0]?.message?.content) {
      throw new Error('Invalid valuation response format');
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

    // Combine research and valuation data
    const analysis = {
      estimatedValue: valuation.estimatedValue,
      confidence: valuation.confidence as 'low' | 'medium' | 'high',
      analysis: valuation.analysis,
      details: propertyDetails
    };

    console.log('Sending analysis:', JSON.stringify(analysis, null, 2));
    
    return new Response(
      JSON.stringify(analysis),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );
  } catch (error) {
    console.error('Error in analyze-property function:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: 'Failed to analyze property. Please try again.'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
