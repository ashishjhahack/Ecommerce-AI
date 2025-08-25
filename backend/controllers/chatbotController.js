import { getGeminiResponse } from "../services/geminiService.js";
import productModel from "../models/productModel.js"; // Your DB model

export const chatbotReply = async (req, res) => {
    try {
        const { message } = req.body;

        const systemPrompt = `
You are an AI shopping assistant for an e-commerce website. 
Always respond in a JSON format (no extra text).
Analyze the user’s query and classify into one of these intents:

1. recommendation → when user asks for product suggestions
   - Fields: { intent: "recommendation", category: "", subCategory: "", budget: "", bestseller: false }

2. bestseller → when user asks for popular / trending products
   - Fields: { intent: "bestseller", category: "", subCategory: "" }

3. filter_price → when user asks products in a price range
   - Fields: { intent: "filter_price", minPrice: 0, maxPrice: 0, category: "", subCategory: "" }

4. category_info → when user only asks about a category/subcategory
   - Fields: { intent: "category_info", category: "", subCategory: "" }

5. general → for delivery, return policy, checkout, offers, etc.
   - Fields: { intent: "general", answer: "short, clear response" }

Rules:
- Always return JSON only. No extra text.
- If unsure, return { "intent": "general", "answer": "Please contact customer support for this." }
`;


        const geminiReply = await getGeminiResponse(systemPrompt, message);

        // Try parsing as JSON for intent
        let parsed;
        try {
            parsed = JSON.parse(geminiReply);
        } catch {
            return res.json({ reply: geminiReply }); // normal text answer
        }

        if (parsed.intent === "bestseller") {
            const products = await productModel.find({
                category: parsed.category,
                subCategory: parsed.subCategory || { $exists: true },
                bestseller: true
            }).limit(5);

            return res.json({
                reply: `Here are our best-selling ${parsed.category}:`,
                products
            });
        }

        if (parsed.intent === "filter_price") {
            const products = await productModel.find({
                category: parsed.category,
                subCategory: parsed.subCategory || { $exists: true },
                price: { $gte: parsed.minPrice, $lte: parsed.maxPrice }
            }).limit(5);

            return res.json({
                reply: `Here are some ${parsed.category} between ₹${parsed.minPrice} and ₹${parsed.maxPrice}:`,
                products
            });
        }

        if (parsed.intent === "recommendation") {
            const query = {
                category: parsed.category,
                ...(parsed.subCategory && { subCategory: parsed.subCategory }),
            };
            if (parsed.budget) query.price = { $lte: parsed.budget };

            const products = await productModel.find(query).limit(5);

            return res.json({
                reply: `Here are some ${parsed.category}${parsed.budget ? ` under ₹${parsed.budget}` : ""}:`,
                products
            });
        }

        if (parsed.intent === "general") {
            return res.json({ reply: parsed.answer });
        }


        res.json({ reply: geminiReply });
    } catch (error) {
        console.error("Chatbot error:", error);
        res.status(500).json({ reply: "Sorry, I’m having trouble right now. Please try again." });
    }
};
