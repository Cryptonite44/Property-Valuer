
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { address, propertyType } = await req.json()
    console.log(`Analyzing property: ${address} (${propertyType})`)

    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Mock analysis data with realistic values
    const mockAnalysis = {
      estimatedValue: Math.floor(250000 + Math.random() * 500000),
      confidence: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
      factors: [
        "Recent sales of similar properties in the area",
        "Property size and condition",
        "Local market demand",
        "Proximity to public transport",
        "School catchment area rating"
      ],
      analysis: "Based on recent market data and comparable properties in the area, this property shows strong potential. The location benefits from excellent transport links and local amenities, which positively impacts its value. The current market trends in this area show steady growth, with particular demand for this property type.",
    }

    console.log('Analysis completed:', mockAnalysis)

    return new Response(
      JSON.stringify(mockAnalysis),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
