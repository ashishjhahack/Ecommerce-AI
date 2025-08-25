import { ecommerceChatbotService } from "../services/chatbot.services.js";
import productModel from "../models/productModel.js"; // Your MongoDB product model

export const chatbotReply = async (req, res) => {
  try {
    const { message } = req.body;

    // 🔹 Get response from Gemini AI
    const geminiReply = await ecommerceChatbotService(message);
    console.log("Gemini raw reply:", geminiReply);

    // 🔹 Parse the AI JSON response
    let parsed;
    try {
      parsed = JSON.parse(geminiReply);
    } catch (error) {
      console.error("Failed to parse Gemini reply as JSON:", error);
      return res.json({
        reply: "⚠️ Sorry, I didn’t understand that. Can you please rephrase?",
      });
    }

    // 🔹 Query MongoDB based on intent
    let products = [];
    if (parsed.intent === "bestseller") {
      products = await productModel
        .find({
          category: parsed.category || { $exists: true },
          subCategory: parsed.subCategory || { $exists: true },
          bestseller: true,
        })
        .limit(5);
      return res.json({
        reply: `Here are our best-selling ${parsed.category || "products"}:`,
        products,
      });
    }

    if (parsed.intent === "filter_price") {
      products = await productModel
        .find({
          category: parsed.category || { $exists: true },
          subCategory: parsed.subCategory || { $exists: true },
          price: { $gte: parsed.minPrice || 0, $lte: parsed.maxPrice || Infinity },
        })
        .limit(5);
      return res.json({
        reply: `Here are some ${parsed.category || "products"} between ₹${
          parsed.minPrice
        } and ₹${parsed.maxPrice}:`,
        products,
      });
    }

    if (parsed.intent === "recommendation") {
      const query = {
        category: parsed.category || { $exists: true },
        ...(parsed.subCategory && { subCategory: parsed.subCategory }),
      };
      if (parsed.budget) query.price = { $lte: parsed.budget };

      products = await productModel.find(query).limit(5);
      return res.json({
        reply: `Here are some recommended ${
          parsed.category || "products"
        }${parsed.budget ? ` under ₹${parsed.budget}` : ""}:`,
        products,
      });
    }

    if (parsed.intent === "category_info") {
      products = await productModel
        .find({
          category: parsed.category || { $exists: true },
          ...(parsed.subCategory && { subCategory: parsed.subCategory }),
        })
        .limit(5);
      return res.json({
        reply: `Here are some ${parsed.category || "products"} in this category:`,
        products,
      });
    }

    // 🔹 Fallback for general queries
    if (parsed.intent === "general") {
      return res.json({ reply: parsed.answer });
    }

    // 🔹 Default fallback
    return res.json({ reply: geminiReply });
  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({
      reply: "⚠️ Sorry, something went wrong. Please try again later.",
    });
  }
};