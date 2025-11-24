import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  try {
    const body = await req.json(); 
    const { resume_text } = body;

    if (!resume_text) {
      return new Response(
        JSON.stringify({ error: "resume_text is required" }),
        { status: 400 }
      );
    }

   
    const result = await processResume(resume_text);

    return new Response(
      JSON.stringify({ result }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: "Function crashed",
        detail: err.message,
      }),
      { status: 500 }
    );
  }
});

async function processResume(text: string) {
  return {
    score: 75,
    strengths: ["Good Structure"],
    concerns: ["Needs more examples"],
  };
}
