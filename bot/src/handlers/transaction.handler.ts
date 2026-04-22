import { MiddlewareFn } from "telegraf";
import { BotContext } from "../types";
import { parseTransactionMessage } from "../utils/transaction.util";

const formatAmount = (amount: number): string => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const buildReply = (transaction: {
  id: string;
  amount: number;
  type: string;
  description: string | null;
  createdAt: string;
}): string => {
  const direction = transaction.type === "income" ? "📈 Kirim" : "📉 Chiqim";
  const noteLine = transaction.description ? `\n📝 Izoh: ${transaction.description}` : "";
  const date = new Date(transaction.createdAt).toLocaleString("uz-UZ");

  return `✅ Muvaffaqiyatli saqlandi!\n\n${direction}\n💰 Summa: ${formatAmount(
    transaction.amount,
  )} UZS\n📅 Sana: ${date}${noteLine}\n\n🆔 ID: \`${transaction.id.slice(0, 8)}\``;
};

const processingUsers = new Set<string>();

export const transactionMessageHandler = (): MiddlewareFn<BotContext> => async (ctx, next) => {
  if (ctx.session) {
    await next();
    return;
  }

  if (!ctx.message || !("text" in ctx.message || "voice" in ctx.message)) {
    await next();
    return;
  }

  if ("text" in ctx.message && ctx.message.text.startsWith("/")) {
    await next();
    return;
  }

  const userId = ctx.from?.id.toString();
  if (userId && processingUsers.has(userId)) {
    await ctx.reply("⏳ Iltimos, kutib turing. Avvalgi so'rovingiz hali bajarilmoqda.");
    return;
  }

  let inputText: string | null = null;
  let loadingMessageId: number | null = null;

  if (userId) processingUsers.add(userId);

  try {
    const loadingMessage = await ctx.reply("⏳ Bajarilmoqda...");
    loadingMessageId = loadingMessage.message_id;

    if ("text" in ctx.message) {
      inputText = ctx.message.text.trim();
    }

    if ("voice" in ctx.message) {
      try {
        await ctx.sendChatAction("typing");
        const fileId = ctx.message.voice.file_id;
        const fileLink = await ctx.telegram.getFileLink(fileId);

        const fileResponse = await fetch(fileLink.href);
        const buffer = await fileResponse.arrayBuffer();

        const formData = new FormData();
        formData.append("audio", new Blob([buffer]), "voice.ogg");
        formData.append("tg_id", userId || "unknown");

        const backendResponse = await fetch("http://localhost:3000/voice", {
          method: "POST",
          body: formData,
        });

        if (!backendResponse.ok) {
          throw new Error(`Backend responded with ${backendResponse.status}`);
        }

        const result = (await backendResponse.json()) as { text: string; response: string };
        inputText = result.text;
      } catch (error) {
        console.error("Voice processing error:", error);
        await ctx.reply(
          "Ovozli xabarni qayta ishlashda xatolik yuz berdi. Iltimos, matn ko'rinishida yuboring.",
        );
        return;
      }
    }

    if (!inputText) {
      await next();
      return;
    }

    const parsed = parseTransactionMessage(inputText);
    if (!parsed) {
      await next();
      return;
    }

    ctx.state.parsedTransaction = parsed;

    try {
      await ctx.sendChatAction("typing");
      const response = await fetch("http://localhost:3000/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parsed.amount,
          type: parsed.type,
          description: parsed.note,
          tg_id: userId,
        }),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as { error: string };
        throw new Error(errorData.error || "Failed to create transaction");
      }

      const transaction = (await response.json()) as {
        id: string;
        amount: number;
        type: string;
        description: string | null;
        createdAt: string;
      };

      await ctx.reply(buildReply(transaction), { parse_mode: "Markdown" });
    } catch (error) {
      console.error("Transaction creation error:", error);
      await ctx.reply("❌ Xatolik yuz berdi. Ma'lumotlarni saqlash imkoni bo'lmadi.");
    }
  } finally {
    if (userId) processingUsers.delete(userId);
    if (loadingMessageId) {
      try {
        await ctx.deleteMessage(loadingMessageId);
      } catch (e) {
        throw new Error("FAILED_TO_DELETE_LOADING_MESSAGE", {
          cause: e,
        });
      }
    }
  }
};
