import { MiddlewareFn } from "telegraf";
import { BotContext } from "../types";

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

  console.log("ctx: message: ", ctx.message);

  const userId = ctx.from?.id.toString();
  if (userId && processingUsers.has(userId)) {
    await ctx.reply("⏳ Iltimos, kutib turing. Avvalgi so'rovingiz hali bajarilmoqda.");
    return;
  }

  let loadingMessageId: number | null = null;
  if (userId) processingUsers.add(userId);
  let backendResponse;

  try {
    const loadingMessage = await ctx.reply("⏳ Bajarilmoqda...");
    loadingMessageId = loadingMessage.message_id;

    const BACKEND_URL = process.env.API_BASE_URL || "http://localhost:3000";

    if ("text" in ctx.message) {
      backendResponse = await fetch(`${BACKEND_URL}/voice/text`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: ctx.message.text, tg_id: userId }),
      });
    } else {
      const fileId = ctx.message.voice.file_id;
      const fileLink = await ctx.telegram.getFileLink(fileId);
      const fileRes = await fetch(fileLink.href);
      const buffer = await fileRes.arrayBuffer();

      const formData = new FormData();
      formData.append("audio", new Blob([buffer], { type: "audio/ogg" }), "voice.ogg");
      formData.append("tg_id", userId || "unknown");

      backendResponse = await fetch(`${BACKEND_URL}/voice`, {
        method: "POST",
        body: formData,
      });
    }

    if (!backendResponse.ok) {
      throw new Error(`Backend responded with ${backendResponse.status}`);
    }

    const result = (await backendResponse.json()) as { text: string; response: string };
    await ctx.reply(result.response);
  } catch (error) {
    console.error("Processing error:", error);
    await ctx.reply("❌ Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.");
  } finally {
    if (userId) processingUsers.delete(userId);
    if (loadingMessageId) {
      try {
        await ctx.deleteMessage(loadingMessageId);
      } catch (e) {
        // Ignored
        throw new Error("FAILED_TO_DELETE_LOADING_MESSAGE");
      }
    }
  }
};
