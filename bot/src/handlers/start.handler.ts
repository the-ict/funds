import { BotContext } from "../types";
import axios from "axios";

const WELCOME_TEXT = `Assalomu alaykum! 👋 Botimizga xush kelibsiz. Ro'yxatdan o'tish uchun bir nechta qisqa ma'lumotlarni to'ldiramiz.`;
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";

interface User {
  id: string;
  name: string;
  phone: string;
  tg_id: number;
  tg_username?: string;
}

const isUserProfileComplete = (user: User): boolean => {
  return !!(user.name && user.phone);
};

export const startHandler = () => async (ctx: BotContext) => {
  if (!ctx.from) {
    return;
  }

  try {
    const response = await axios.get<User>(`${API_BASE_URL}/users/tg/${ctx.from.id}`);
    const existingUser = response.data;

    if (isUserProfileComplete(existingUser)) {
      await ctx.reply(
        `Assalomu alaykum, ${existingUser.name}! 👋\n\nSiz allaqachon ro'yxatdan o'tgansiz. Bot xizmatlaridan foydalanishingiz mumkin. 🎉`,
      );
      return;
    } else {
      await ctx.reply(
        `Salom ${existingUser.name}! 👋\n\nProfilingiz to'liq emas. Ro'yxatdan o'tishni yakunlash uchun ma'lumotlarni to'ldiring.`,
      );
    }
  } catch (error: any) {
    if (error.response?.status === 404) {
    } else {
      console.error("Error checking user status:", error.message);
    }
  }

  ctx.clearSession();

  ctx.setSession({
    step: "name",
    data: {},
  });

  const nameExample = `📝 Misol: "Abdulla Qosimov Umarali" yoki "Fatima Mirzaeva Rustamovna"`;
  await ctx.reply(`${WELCOME_TEXT}\n\n👤 Ismingiz, familiyangiz va otasining ismini kiriting:\n${nameExample}`);
};
