import { BotContext } from "../types";
import { UserService } from "../services/user.service";

const WELCOME_TEXT = `Assalomu alaykum! 👋
Botimizga xush kelibsiz.
Ro‘yxatdan o‘tish uchun bir nechta qisqa ma’lumotlarni to‘ldiramiz.`;

export const startHandler = (userService: UserService) => async (ctx: BotContext) => {
  if (!ctx.from) {
    return;
  }

  ctx.clearSession();

  const tgId = String(ctx.from.id);
  const existingUser = await userService.findByTelegramId(tgId);

  if (existingUser) {
    await ctx.reply("Siz allaqachon ro‘yxatdan o‘tgansiz ✅");
    return;
  }

  ctx.setSession({
    step: "name",
    data: {},
  });

  await ctx.reply(`${WELCOME_TEXT}\n\n👤 Ismingiz va familiyangizni kiriting:`);
};
