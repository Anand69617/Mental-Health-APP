import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const {
      mode,
      messages,
      persona,
      userId = "anonymous",
    } = await request.json();

    let systemPrompt = "";

    if (mode === "happiness_assessment") {
      systemPrompt =
        "You are a positive mental health assistant. Analyze the user's input and provide a 'Happiness Level' from 0 to 100. Be encouraging and supportive. Return your response in a supportive tone, and at the very end, include a line that says 'SCORE: [number]'.";
    } else if (mode === "friend_talk") {
      const personas = {
        parent:
          "You are a warm, nurturing, and protective parent. You offer unconditional love and wisdom.",
        sibling:
          "You are a supportive, slightly playful, and deeply understanding sibling. You've grown up together and share a unique bond.",
        friend:
          "You are a loyal, non-judgmental, and fun friend. You're here to listen and maybe crack a small joke to lighten the mood.",
        balanced:
          "You are a balanced listener, offering a mix of empathy and practical perspective without taking a specific family role.",
      };
      systemPrompt = `${personas[persona] || personas.balanced} Your goal is to help the user feel heard and supported through their depression in a gentle, non-clinical way.`;
    } else if (mode === "medical") {
      systemPrompt = `You are a friendly mental health support assistant for Indian users. Follow these rules strictly:

1. Keep responses SHORT - use bullet points or paragraphs of ~50 words max
2. Use simple, everyday language - NO medical jargon or medicine names  
3. Be warm and conversational, like talking to a friend
4. When relevant, mention Indian mental health resources:
   - National Mental Health Helpline: 1800-599-0019 (Toll-free)
   - Vandrevala Foundation: 1860-2662-345 or 1800-2333-330
   - NIMHANS Helpline: 080-46110007
   - iCall: 9152987821
5. Focus on simple coping strategies and self-care tips
6. Always remind users to reach out to loved ones or professionals if needed
7. NEVER prescribe or suggest specific medications

Format your responses in bullet points or very short paragraphs for easy reading.`;
    }

    const aiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_CREATE_APP_URL || ""}/integrations/google-gemini-2-5-flash/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "system", content: systemPrompt }, ...messages],
        }),
      },
    );

    if (!aiResponse.ok) {
      throw new Error(`AI Integration failed: ${aiResponse.statusText}`);
    }

    const data = await aiResponse.json();
    const textResponse = data.choices[0].message.content;

    // Save to DB
    if (mode === "happiness_assessment") {
      const scoreMatch = textResponse.match(/SCORE:\s*(\d+)/);
      const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;
      await sql`INSERT INTO assessments (user_id, happiness_score, analysis) VALUES (${userId}, ${score}, ${textResponse})`;
    } else {
      const lastUserMsg = messages[messages.length - 1].content;
      await sql`INSERT INTO chat_messages (user_id, persona, role, content) VALUES (${userId}, ${persona || mode}, 'user', ${lastUserMsg})`;
      await sql`INSERT INTO chat_messages (user_id, persona, role, content) VALUES (${userId}, ${persona || mode}, 'assistant', ${textResponse})`;
    }

    return Response.json({ text: textResponse });
  } catch (error) {
    console.error("AI Error:", error);
    return Response.json(
      { error: "Failed to get AI response" },
      { status: 500 },
    );
  }
}
