// controllers/chatbot.controller.js
import { ecommerceChatbotService } from "../services/chatbot.services.js";
import productModel from "../models/productModel.js";

export const chatbotReply = async (req, res) => {
  try {
    const { message } = req.body;

    // 🔹 Get response from Gemini AI
    const geminiReply = await ecommerceChatbotService(message);
    console.log("Gemini raw reply:", geminiReply);

    // 🔹 Parse the AI JSON response
    let parsed;
    try {
      // Clean the string to extract the JSON object, removing markdown backticks
      const startIndex = geminiReply.indexOf('{');
      const endIndex = geminiReply.lastIndexOf('}');
      if (startIndex === -1 || endIndex === -1) {
        throw new Error("No JSON object found in the reply.");
      }
      const jsonString = geminiReply.substring(startIndex, endIndex + 1);
      parsed = JSON.parse(jsonString);
    } catch (error) {
      console.error("❌ Failed to parse Gemini reply:", error.message);
      return res.json({
        reply: "⚠️ Sorry, I didn’t understand that. Can you please rephrase?",
      });
    }

    let products = [];

    // 🔹 Bestseller
    if (parsed.intent === "bestseller") {
      products = await productModel.find({
        ...(parsed.category && { category: parsed.category }),
        ...(parsed.subCategory && { subCategory: parsed.subCategory }),
        bestseller: true,
      }).limit(5);

      return res.json({
        reply: `Here are our best-selling ${parsed.category || "products"}:`,
        products,
      });
    }

    // 🔹 Category
    if (parsed.intent === "category") {
      products = await productModel.find({
        ...(parsed.category && { category: parsed.category }),
        ...(parsed.subCategory && { subCategory: parsed.subCategory }),
      }).limit(5);

      return res.json({
        reply: `Here are some ${parsed.category || "products"} in this category:`,
        products,
      });
    }

    // 🔹 SubCategory
    if (parsed.intent === "subCategory") {
      products = await productModel.find({
        ...(parsed.subCategory && { subCategory: parsed.subCategory }),
        ...(parsed.category && { category: parsed.category }),
      }).limit(5);

      return res.json({
        reply: `Here are some ${parsed.subCategory || "products"} in this sub-category:`,
        products,
      });
    }

    // 🔹 Sizes
    if (parsed.intent === "sizes") {
      products = await productModel.find({
        sizes: { $in: parsed.sizes || [] },
      }).limit(5);

      return res.json({
        reply: `Here are some products available in sizes: ${parsed.sizes?.join(", ")}`,
        products,
      });
    }

    // 🔹 Filter Price
    if (parsed.intent === "filter_price") {
      products = await productModel.find({
        ...(parsed.category && { category: parsed.category }),
        ...(parsed.subCategory && { subCategory: parsed.subCategory }),
        price: { $gte: parsed.minPrice || 0, $lte: parsed.maxPrice || Infinity },
      }).limit(5);

      return res.json({
        reply: `Here are some ${parsed.category || "products"} between ₹${parsed.minPrice || 0} and ₹${parsed.maxPrice || "∞"}:`,
        products,
      });
    }

    // 🔹 Recommendation
    if (parsed.intent === "recommendation") {
      const query = {
        ...(parsed.category && { category: parsed.category }),
        ...(parsed.subCategory && { subCategory: parsed.subCategory }),
        ...(parsed.budget && { price: { $lte: parsed.budget } }),
      };

      products = await productModel.find(query).limit(5);

      return res.json({
        reply: `Here are some recommended ${parsed.category || "products"}${parsed.budget ? ` under ₹${parsed.budget}` : ""}:`,
        products,
      });
    }

    // 🔹 General fallback
    if (parsed.intent === "general") {
      return res.json({ reply: parsed.answer });
    }

    // 🔹 Default fallback
    return res.json({ reply: "⚠️ Sorry, I didn’t get that. Try asking differently." });

  } catch (error) {
    console.error("❌ Chatbot error:", error);
    res.status(500).json({
      reply: "⚠️ Sorry, something went wrong. Please try again later.",
    });
  }
};
