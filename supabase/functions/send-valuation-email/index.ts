
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ValuationRequest {
  name: string;
  email: string;
  phone: string;
  address: string;
  estimatedValue: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, address, estimatedValue }: ValuationRequest = await req.json();

    // Send email to Digitol
    const emailResponse = await resend.emails.send({
      from: "Property Valuer <onboarding@resend.dev>",
      to: ["hello@digitol.co.uk"],
      subject: "New Valuation Request",
      html: `
        <h1>New Valuation Request Received</h1>
        <p>A new valuation request has been submitted with the following details:</p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Property Address:</strong> ${address}</li>
          <li><strong>AI Estimated Value:</strong> ${estimatedValue}</li>
        </ul>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-valuation-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
