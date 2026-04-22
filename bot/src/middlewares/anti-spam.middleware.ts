import { MiddlewareFn } from "telegraf";
import { BotContext } from "../types";

const lastActivity = new Map<string, number>();
const MIN_INTERVAL_MS = 700;

export const antiSpamMiddleware = (): MiddlewareFn<BotContext> => async (ctx, next) => {
  const userId = ctx.from?.id;

  if (!userId) {
    await next();
    return;
  }

  const key = String(userId);
  const now = Date.now();
  const lastSeen = lastActivity.get(key) ?? 0;

  if (now - lastSeen < MIN_INTERVAL_MS) {
    return;
  }

  lastActivity.set(key, now);
  await next();
};
