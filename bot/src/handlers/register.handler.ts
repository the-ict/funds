import { Markup } from "telegraf";
import { BotContext } from "../types";
import { UserService, mapPrismaUserCreateError } from "../services/user.service";

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
  const state = ctx.state as {
    validatedName?: string | null;
    validatedPhone?: string | null;
    contactOwnerMismatch?: boolean;
  };

  if (!session) {
    if (ctx.message && "text" in ctx.message && !ctx.message.text.startsWith("/")) {
      await ctx.reply("Ro‘yxatdan o‘tishni boshlash uchun /start buyrug‘ini yuboring.");
    }
    return;
  }

  if (session.step === "name") {
    if (!ctx.message || !("text" in ctx.message)) {
      await ctx.reply("Iltimos, ismingiz va familiyangizni matn ko‘rinishida yuboring.");
      return;
    }

    const name = state.validatedName;
    if (!name) {
      await ctx.reply("Ism kiritishda xatolik bor. Iltimos, to‘liq ism va familiyangizni kiriting.");
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

export const confirmRegistrationHandler = (userService: UserService) => async (ctx: BotContext) => {
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

  try {
    const tgId = String(ctx.from.id);
    const username = ctx.from.username ?? "username yo‘q";

    await userService.createUser({
      name,
      phone,
      tgId,
      tgUsername: username,
    });

    ctx.clearSession();
    await ctx.answerCbQuery("Tasdiqlandi ✅");
    await ctx.reply("Tabriklaymiz! Siz muvaffaqiyatli ro‘yxatdan o‘tdingiz ✅");
    return;
  } catch (error) {
    const errorType = mapPrismaUserCreateError(error);

    if (errorType === "tg_id_exists") {
      ctx.clearSession();
      await ctx.answerCbQuery();
      await ctx.reply("Siz allaqachon ro‘yxatdan o‘tgansiz ✅");
      return;
    }

    if (errorType === "phone_exists") {
      ctx.setSession({
        step: "phone",
        data: {
          name,
        },
      });
      await ctx.answerCbQuery();
      await ctx.reply(
        "Bu telefon raqam avval ro‘yxatdan o‘tgan. Iltimos, boshqa raqam kiriting:",
        phoneKeyboard,
      );
      return;
    }

    if (errorType === "username_exists") {
      ctx.clearSession();
      await ctx.answerCbQuery();
      await ctx.reply("Bu Telegram akkaunt ma’lumoti bilan ro‘yxatdan o‘tishda muammo bor. Iltimos, /start bilan qayta urinib ko‘ring.");
      return;
    }

    throw error;
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
