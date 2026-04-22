import OpenAI from "openai";
import logger from "../utils/loggers.js";

const openai = new OpenAI({
    baseURL: process.env.DEEPSEEK_API_BASE_URL,
    apiKey: process.env.DEEPSEEK_API_KEY
});

class DeepSeekService {
    async getResponse(prompt: string, tg_id: string) {
        try {
            const response = await openai.chat.completions.create({
                model: "deepseek-chat",
                messages: [{
                    role: "system",
                    content: "You are a helpful assistant that helps users to manage their finances and transactions. You can help users to identify their expenses, categorize them, and provide insights and analytics based on their spending habits. You can also help users to set reminders for upcoming bills and payments, and provide notifications to remind them. Additionally, you can automatically import transactions, which will save them time and effort in logging their expenses and income manually."
                },
                {
                    role: "user",
                    content: prompt
                }],
                max_tokens: 1000,
                temperature: 0.7,
                tools: [
                    {
                        "type": "function",
                        "function": {
                            "name": "add_transaction",
                            "description": "Add a new transaction to the user's account.",
                            "parameters": {
                                "type": "object",
                                "properties": {
                                    "type": {
                                        "type": "string",
                                        "description": "The type of the transaction, either 'expense' or 'income'."
                                    },
                                    "amount": {
                                        "type": "number",
                                        "description": "The amount of the transaction."
                                    },
                                    "category": {
                                        "type": "string",
                                        "description": "The category of the transaction, such as 'food', 'transportation', 'entertainment', etc. if the category does not exist you have a permission to create a new category with the same name and assign the transaction to that category."
                                    },
                                    "note": {
                                        "type": "string",
                                        "description": "A note or description for the transaction. (Optional)"
                                    },
                                    "name": {
                                        "type": "string",
                                        "description": "The name of the transaction."
                                    },
                                },
                                "required": ["type", "amount"]
                            },
                        }
                    },
                    {
                        "type": "function",
                        "function": {
                            "name": "add_category",
                            "description": "Add a new category if needed",
                            "parameters": {
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string",
                                        "description": "A name for calling to that specific category"
                                    }
                                },
                                "required": ["name"]
                            }
                        }
                    },
                    {
                        "type": "function",
                        "function": {
                            "name": "get_categories",
                            "description": "Get all categories of the user",
                        },
                    }
                ]
            });

            if (!response.choices[0] || response.choices.length <= 0) {
                logger.error("No response from DeepSeek API", { response });
                throw new Error("No response from DeepSeek API", {
                    cause: "No choices in response",
                });
            };

            return response.choices[0].message.content;
        } catch (error) {
            logger.error("Failed to get response from DeepSeek API", { error });
            throw new Error("Failed to get response from DeepSeek API", {
                cause: error
            });
        }
    }
};

export default new DeepSeekService();