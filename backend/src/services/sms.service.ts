import logger from "../utils/loggers";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

class SmsService {
    private botToken = process.env.TELEGRAM_BOT_TOKEN;
    private baseUrl = `https://api.telegram.org/bot${this.botToken}`;

    async sendMessage(chatId: string | number, text: string) {
        try {
            if (!this.botToken) {
                throw new Error("TELEGRAM_BOT_TOKEN is not defined in environment variables");
            }

            const response = await axios.post(`${this.baseUrl}/sendMessage`, {
                chat_id: chatId,
                text: text,
                parse_mode: "HTML",
            });

            return response.data;
        } catch (error) {
            logger.error("Failed to send Telegram message", {
                chatId,
                cause: error,
            });
            throw error;
        }
    }

    async sendVerifyCode(tg_id: string | number, code: string) {
        const message = `Sizning tasdiqlash kodingiz: <b>${code}</b>`;
        return await this.sendMessage(tg_id, message);
    }
}

const smsService = new SmsService();

export default smsService;