import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// 🛍️ Ecommerce Chatbot Service
export const ecommerceChatbotService = async (userMessage) => {
  try {
    // 📌 System prompt (strict JSON output rules)
    const systemPrompt = `You are an AI shopping assistant for an e-commerce website that translates user requests into a specific JSON format.
Always respond in **valid JSON only** (no extra text). Your sole purpose is to extract the user's intent and relevant details.

If the user's request is ambiguous or missing information needed for an intent, respond with the 'general' intent and ask a clarifying question.

Supported intents:
1. recommendation → { "intent": "recommendation", "category": "string (optional)", "subCategory": "string (optional)", "budget": number (optional), "sizes": ["string"] (optional) }
2. bestseller → { "intent": "bestseller", "category": "string (optional)", "subCategory": "string (optional)" }
3. filter_price → { "intent": "filter_price", "minPrice": number, "maxPrice": number, "category": "string (optional)", "subCategory": "string (optional)" }
4. category → { "intent": "category", "category": "string (optional)", "subCategory": "string (optional)" }
5. sizes → { "intent": "sizes", "sizes": ["string"], "category": "string (optional)", "subCategory": "string (optional)" }
6. subCategory → { "intent": "subCategory", "subCategory": "string", "category": "string (optional)" }
7. general → { "intent": "general", "answer": "string" }

Examples:
User: "Show me products under 200"
Response: {"intent": "recommendation", "category": "clothes", "budget": 200}

User: "Best clothes for men"
Response: {"intent": "bestseller", "category": "Men", "subCategory": "topwear"}

User: "women"
Response: {"intent": "category", "category": "Women"}

User: "men"
Response: {"intent": "category", "category": "Men"}

User: "topwear"
Response: {"intent": "subCategory", "subCategory": "topwear"}

User: "provide men's topwear"
Response: {"intent": "category", "category": "Men", "subCategory": "topwear"}

User: "provide me a topwear products"
Response: {"intent": "recommendation", "subCategory": "topwear"}

User: "provide men's clothes under 150"
Response: {"intent": "recommendation", "category": "clothes", "subCategory": "men", "budget": 150}

User: "Do you have size XL in t-shirts?"
Response: {"intent": "sizes", "category": "clothes", "subCategory": "topwear", "sizes": ["XL"]}

User: "Tell me about men's clothes"
Response: {"intent": "category", "category": "clothes", "subCategory": "men"}
    `;

    // Combine system + user
    const prompt = `${systemPrompt}\nUser: ${userMessage}`;

    // ✅ New SDK syntax
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 }, // disables extra thinking
      },
    });

    const text = result?.text || '{"intent": "general", "answer": "⚠️ Sorry, something went wrong."}';
    return text;
  } catch (error) {
    console.error("Error in ecommerceChatbotService:", error);
    return '{"intent": "general", "answer": "⚠️ Sorry, something went wrong."}';
  }
};
