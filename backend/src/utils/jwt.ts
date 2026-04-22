import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_ACCESS_TOKEN_EXPIRES_IN = process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || "15m";
const JWT_REFRESH_TOKEN_EXPIRES_IN = process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || "7d";

export function generateAccessToken(user_id: string): string {
    return jwt.sign({ user_id }, JWT_SECRET, {
        expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN as any
    });
}

export function generateRefreshToken(user_id: string): string {
    return jwt.sign({ user_id }, JWT_SECRET, {
        expiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN as any
    });
}