import { MiddlewareFn } from "telegraf";
import { BotContext } from "../types";

export const errorMiddleware = (): MiddlewareFn<BotContext> => async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.error("Bot xatosi:", error);
    await ctx.reply("Kechirasiz, vaqtinchalik xatolik yuz berdi. Iltimos, birozdan keyin yana urinib ko‘ring.");
  }
};
