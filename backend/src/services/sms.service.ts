import logger from "../utils/loggers.js";
import axios from "axios";
import type {
    IGetTokenResponse,
    IRefreshExistingTokenResponse,
    ISendSmsResponse
} from "../types/sms.types.js";
import dotenv from "dotenv";

dotenv.config();

class SmsService {
    private baseUrl: string = String(process.env.ESKIZ_BASE_URL);
    private username: string = String(process.env.ESKIZ_USERNAME);
    private password_token: string = String(process.env.ESKIZ_PASSWORD);
    private token: string | null = null;

    async getToken(): Promise<IGetTokenResponse> {
        try {
            const data = new FormData();
            data.append("email", this.username);
            data.append("password", this.password_token);

            const response = await axios.post(`${this.baseUrl}/auth/login`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            this.token = response.data.data.token;
            return response.data;
        } catch (error) {
            logger.error("Failed to get Eskiz token:", {
                cause: error,
            });
            throw new Error("Failed to get Eskiz token", {
                cause: error,
            })
        }
    };

    async refreshToken(): Promise<IRefreshExistingTokenResponse> {
        try {
            const response = await axios.patch(`${this.baseUrl}/auth/refresh`, {}, {
                headers: {
                    "Authorization": `Bearer ${this.token}`
                }
            });

            console.log(response.data);

            this.token = response.data.data.token;
            return response.data;
        } catch (error) {
            logger.error("Failed to refresh Eskiz token:", {
                cause: error,
            });
            throw new Error("Failed to refresh Eskiz token", {
                cause: error,
            })
        }
    };

    async sendSms({
        phone_number,
        from = '4546',
        message,
        callback_url = ''
    }: {
        phone_number: string;
        message: string;
        from?: string;
        callback_url?: string
    }): Promise<ISendSmsResponse | void> {
        try {
            if (!this.token) {
                await this.getToken();
            }

            const data = new FormData();
            data.append("mobile_phone", phone_number);
            data.append("message", message);
            data.append("from", from);
            data.append('callback_url', callback_url);

            const response = await axios.post(`${this.baseUrl}/message/sms/send`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${this.token}`
                },
            });
            return response.data;
        } catch (error: any) {

            if (error?.response?.status === 401) {
                await this.refreshToken();
                return await this.sendSms({ phone_number, from, message, callback_url });
            }
            logger.error("Failed to send Eskiz SMS", {
                cause: error,
            });
            throw new Error("Failed to send Eskiz SMS", {
                cause: error,
            });
        };
    };
};


const smsService = new SmsService();

export default smsService;