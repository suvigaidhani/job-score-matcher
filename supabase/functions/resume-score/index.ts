import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  try {
    const body = await req.json(); // ← Do NOT JSON.parse manually
    const { resume_text } = body;

    if (!resume_text) {
      return new Response(
        JSON.stringify({ error: "resume_text is required" }),
        { status: 400 }
      );
    }

    // ---- Your existing AI logic goes here ----
    // Keep whatever logic worked in your old project:
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

// Replace with your actual working logic
async function processResume(text: string) {
  return {
    score: 75,
    strengths: ["Good Structure"],
    concerns: ["Needs more examples"],
  };
}
