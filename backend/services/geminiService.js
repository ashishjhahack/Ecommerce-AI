
export const getGeminiResponse = async (systemPrompt, userMessage) => {
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({  
          contents: [
            {
              role: "user",
              parts: [{ text: `${systemPrompt}\nUser: ${userMessage}` }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    // Gemini API returns responses in an array
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I didn’t understand that.";
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Sorry, something went wrong. Please try again later.";
  }
};
