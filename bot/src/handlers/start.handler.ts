import { BotContext } from "../types";

const WELCOME_TEXT = `Assalomu alaykum! 👋 Botimizga xush kelibsiz. Ro‘yxatdan o‘tish uchun bir nechta qisqa ma’lumotlarni to‘ldiramiz.`;

export const startHandler = () => async (ctx: BotContext) => {
  if (!ctx.from) {
    return;
  }

  ctx.clearSession();

  ctx.setSession({
    step: "name",
    data: {},
  });

  await ctx.reply(`${WELCOME_TEXT}\n\n👤 Ismingiz va familiyangizni kiriting:`);
};
