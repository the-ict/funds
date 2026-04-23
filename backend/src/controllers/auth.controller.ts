import { generateAccessToken } from "../utils/jwt.js";
import smsService from "../services/sms.service.js";
import type { Request, Response, } from "express"
import { prisma } from "../lib/prisma.js";
import logger from "../utils/loggers.js";

export const login = async (req: Request, res: Response) => {
    try {
        const { phone } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                phone: phone,
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString();

        await smsService.sendVerifyCode(user.tg_id, otp);

        try {
            await prisma.verify.create({
                data: {
                    phone: phone,
                    code: otp,
                }
            });
        } catch (error) {
            logger.error("Failed to create verify record", {
                cause: error,
            });
            return res.status(500).json({ message: "Failed to create verify record", cause: error });
        }

        return res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const verify = async (req: Request, res: Response) => {
    try {
        const { phone, code } = req.body;

        const verify = await prisma.verify.findFirst({
            where: {
                phone: phone,
                code: code,
            }
        });

        if (!verify) {
            return res.status(404).json({ message: "Verify code not found" });
        }

        const now = new Date();
        const expired_at = new Date(verify.createdAt);
        expired_at.setMinutes(expired_at.getMinutes() + 1);

        if (now > expired_at) {
            return res.status(404).json({ message: "Verify code expired" });
        }

        await prisma.verify.delete({
            where: {
                id: verify.id,
            }
        });

        const user = await prisma.user.findUnique({
            where: { phone }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "Verify code successfully", token: generateAccessToken(user.id) });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}