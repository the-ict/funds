import { MiddlewareFn } from "telegraf";
import { BotContext, SessionState } from "../types";

const sessions = new Map<string, SessionState>();

export const sessionMiddleware = (): MiddlewareFn<BotContext> => async (ctx, next) => {
  const fromId = ctx.from?.id;
  const key = fromId ? String(fromId) : undefined;

  ctx.session = key ? sessions.get(key) : undefined;
  ctx.setSession = (session?: SessionState) => {
    if (!key) {
      return;
    }

    if (!session) {
      sessions.delete(key);
      ctx.session = undefined;
      return;
    }

    sessions.set(key, session);
    ctx.session = session;
  };

  ctx.clearSession = () => {
    if (!key) {
      return;
    }

    sessions.delete(key);
    ctx.session = undefined;
  };

  await next();
};
