import { Markup } from "telegraf";
import { BotContext } from "../types";
import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";
const CONFIRM_DATA = "registration_confirm";
const RESTART_DATA = "registration_restart";

const phoneKeyboard = Markup.keyboard([
  [Markup.button.contactRequest("📲 Raqamni ulashish")],
]).resize();

const confirmKeyboard = Markup.inlineKeyboard([
  [
    Markup.button.callback("✅ Tasdiqlash", CONFIRM_DATA),
    Markup.button.callback("🔄 Qaytadan boshlash", RESTART_DATA),
  ],
]);

const summaryText = (name: string, phone: string, username: string): string => `📋 Ma’lumotlaringiz:

👤 Ism: ${name}

📱 Telefon: ${phone}

🔗 Username: ${username}`;


export const registerMessageHandler = () => async (ctx: BotContext) => {
  const session = ctx.session;
  const state = ctx.state;

  console.log("session: ", session);

  if (!session) {
    return;
  }

  if (session.step === "name") {
    console.log("i am inside of name step")
    if (!ctx.message || !("text" in ctx.message)) {
      await ctx.reply('Iltimos, ismingiz va familiyangizni matn ko\'rinishida yuboring.\n\n📝 Misol: "Abdulla Qosimov Umarali"');
      return;
    }

    console.log("state: Just wanna see what state looks like", state);

    const name = state.validatedName;
    if (!name) {
      await ctx.reply('Ism kiritishda xatolik bor. Iltimos, to\'liq ism, familiya va otasining ismini kiriting.\n\n📝 Misol: "Abdulla Qosimov Umarali" yoki "Fatima Mirzaeva Rustamovna"');
      return;
    }

    ctx.setSession({
      step: "phone",
      data: {
        ...session.data,
        name,
      },
    });

    await ctx.reply(
      "📱 Telefon raqamingizni yuboring yoki pastdagi tugma orqali ulashing:",
      phoneKeyboard,
    );
    return;
  }

  if (session.step === "phone") {
    if (state.unsupportedPhoneInput) {
      await ctx.reply(
        "Telefon bosqichida faqat raqamni matn ko‘rinishida yoki kontakt tugmasi orqali yuborishingiz mumkin.",
        phoneKeyboard,
      );
      return;
    }
    if (state.contactOwnerMismatch) {
      await ctx.reply(
        "Iltimos, faqat o‘zingizga tegishli telefon raqamni ulashing yoki qo‘lda kiriting.",
        phoneKeyboard,
      );
      return;
    }

    if (!state.validatedPhone) {
      await ctx.reply(
        "Telefon raqam formati noto‘g‘ri. Iltimos, +998XXXXXXXXX formatida qayta yuboring yoki tugmadan foydalaning.",
        phoneKeyboard,
      );
      return;
    }

    const username = ctx.from?.username ? `@${ctx.from.username}` : "username yo‘q";

    ctx.setSession({
      step: "confirm",
      data: {
        ...session.data,
        phone: state.validatedPhone,
      },
    });
    await ctx.reply(summaryText(session.data.name ?? "", state.validatedPhone, username), {
      ...confirmKeyboard,
      ...Markup.removeKeyboard(),
    });
    return;
  }

  if (session.step === "confirm") {
    await ctx.reply("Iltimos, tasdiqlash uchun quyidagi tugmalardan birini tanlang.");
  }
};

export const confirmRegistrationHandler = () => async (ctx: BotContext) => {
  if (!ctx.session || !ctx.from) {
    await ctx.answerCbQuery("Avval /start buyrug‘ini yuboring.");
    return;
  }

  const { name, phone } = ctx.session.data;
  if (!name || !phone) {
    ctx.clearSession();
    await ctx.answerCbQuery();
    await ctx.reply("Ma’lumotlar topilmadi. Iltimos, /start orqali qaytadan boshlang.");
    return;
  }

  ctx.clearSession();
  await ctx.answerCbQuery("Tasdiqlandi ✅");

  try {
    const userData = {
      name,
      phone,
      tg_id: ctx.from.id,
      tg_username: ctx.from.username || null,
    };

    await axios.post(`${API_BASE_URL}/users`, userData);

    await ctx.reply(
      "Ajoyib! Ma'lumotlaringiz qabul qilindi ✅",
      Markup.removeKeyboard(),
    );
  } catch (error: any) {
    console.error("Error creating user:", error.response?.data || error.message);
    await ctx.reply(
      "Ro'yxatdan o'tishda xatolik yuz berdi. Iltimos, /start orqali qaytadan harakat qiling.",
      Markup.removeKeyboard(),
    );
  }
};

export const restartRegistrationHandler = () => async (ctx: BotContext) => {
  ctx.setSession({
    step: "name",
    data: {},
  });
  await ctx.answerCbQuery("Qaytadan boshlandi");
  await ctx.reply("👤 Ismingiz va familiyangizni kiriting:", Markup.removeKeyboard());
};

export const registrationActionData = {
  confirm: CONFIRM_DATA,
  restart: RESTART_DATA,
};
