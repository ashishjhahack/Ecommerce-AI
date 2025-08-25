import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// 🛍️ Ecommerce Chatbot Service
export const ecommerceChatbotService = async (userMessage) => {
  try {
    // 📌 System prompt (strict JSON output rules)
    const systemPrompt = `
You are an AI shopping assistant for an e-commerce website. 
Always respond in valid JSON format (no extra text).

Supported intents:
1. recommendation → { "intent": "recommendation", "category": "string", "subCategory": "string (optional)", "budget": number (optional) }
2. bestseller → { "intent": "bestseller", "category": "string (optional)", "subCategory": "string (optional)" }
3. filter_price → { "intent": "filter_price", "minPrice": number, "maxPrice": number, "category": "string (optional)", "subCategory": "string (optional)" }
4. category_info → { "intent": "category_info", "category": "string", "subCategory": "string (optional)" }
5. general → { "intent": "general", "answer": "string" }

Examples:
User: "Show me mobiles under 200"
Response: {"intent": "recommendation", "category": "mobiles", "budget": 200}

User: "Best clothes for men"
Response: {"intent": "bestseller", "category": "clothes", "subCategory": "men"}
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
