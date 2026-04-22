import OpenAI from "openai";
import logger from "../utils/loggers.js";
import { prisma } from "../lib/prisma.js";

const openai = new OpenAI({
  baseURL: process.env.DEEPSEEK_API_BASE_URL,
  apiKey: process.env.DEEPSEEK_API_KEY,
});

class DeepSeekService {
  async getResponse(prompt: string, tg_id: string) {
    try {
      const messages: any[] = [
        {
          role: "system",
          content:
            "You are a helpful assistant that helps users to manage their finances and transactions. You can help users to identify their expenses, categorize them, and provide insights and analytics based on their spending habits. Use the add_transaction tool to log transactions. Always confirm the transaction details to the user in Uzbek. Use natural language and emojis.",
        },
        {
          role: "user",
          content: prompt,
        },
      ];

      const tools: any[] = [
        {
          type: "function",
          function: {
            name: "add_transaction",
            description: "Add a new transaction to the user's account.",
            parameters: {
              type: "object",
              properties: {
                type: {
                  type: "string",
                  enum: ["expense", "income"],
                  description: "The type of the transaction.",
                },
                amount: {
                  type: "number",
                  description: "The amount of the transaction.",
                },
                category: {
                  type: "string",
                  description: "The category of the transaction.",
                },
                note: {
                  type: "string",
                  description: "A note or description for the transaction.",
                },
              },
              required: ["type", "amount"],
            },
          },
        },
      ];

      const response = await openai.chat.completions.create({
        model: "deepseek-chat",
        messages,
        max_tokens: 1000,
        temperature: 0.7,
        tools,
      });

      let message = response.choices[0]!.message;

      if (message.tool_calls && message.tool_calls.length > 0) {
        messages.push(message);

        for (const toolCall of message.tool_calls) {
          if (
            toolCall.type === "function" &&
            toolCall.function.name === "add_transaction"
          ) {
            const args = JSON.parse(toolCall.function.arguments);
            const result = await this.addTransaction(args, tg_id);

            messages.push({
              role: "tool",
              tool_call_id: toolCall.id,
              content: JSON.stringify({
                status: "success",
                transaction_id: result.id,
                message: "Transaction logged successfully",
              }),
            });
          }

          if (toolCall.type === "function" && toolCall.function.name === "add_category") {
            const args = JSON.parse(toolCall.function.arguments);
            const result = await this.addCategory(args, tg_id);

            messages.push({
              role: "tool",
              tool_call_id: toolCall.id,
              content: JSON.stringify({
                status: "success",
                category_id: result.id,
                message: "Category added successfully",
              }),
            });
          }
        }

        const finalResponse = await openai.chat.completions.create({
          model: "deepseek-chat",
          messages,
        });

        return finalResponse.choices[0]!.message.content;
      }

      return message.content;
    } catch (error) {
      logger.error("Failed to get response from DeepSeek API", { error });
      throw new Error("Failed to get response from DeepSeek API", {
        cause: error,
      });
    }
  }

  private async addTransaction(args: any, tg_id: string) {
    const { amount, type, note, category } = args;

    const user = await prisma.user.findUnique({
      where: { tg_id: tg_id.toString() },
    });

    if (!user) {
      throw new Error(`User with tg_id ${tg_id} not found`);
    }

    return await prisma.transaction.create({
      data: {
        amount,
        type,
        description: note || category || "AI logged transaction",
        user_id: user.id,
      },
    });
  }

  private async addCategory(args: any, tg_id: string) {
    const { name } = args;

    const user = await prisma.user.findUnique({
      where: { tg_id: tg_id.toString() },
    });

    if (!user) {
      throw new Error(`User with tg_id ${tg_id} not found`);
    }

    return await prisma.categories.create({
      data: {
        name,
        user_id: user.id,
        type: "AI generated",
      },
    });
  }
}

export default new DeepSeekService();