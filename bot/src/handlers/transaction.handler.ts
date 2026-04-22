import { MiddlewareFn } from "telegraf";
import { BotContext } from "../types";
import { parseTransactionMessage } from "../utils/transaction.util";

const formatAmount = (amount: number): string => new Intl.NumberFormat("uz-UZ").format(amount);

const buildReply = (
  type: "income" | "expense",
  amount: number,
  note: string | null,
  currency: string,
): string => {
  const direction = type === "income" ? "Kirim" : "Chiqim";
  const noteLine = note ? `\n📝 Izoh: ${note}` : "";

  return `✅ Qayd qildim:\n\n🧾 Turi: ${direction}\n💵 Summa: ${formatAmount(amount)} ${currency}${noteLine}`;
};

export const transactionMessageHandler = (): MiddlewareFn<BotContext> => async (ctx, next) => {
  if (ctx.session) {
    await next();
    return;
  }

  if (!ctx.message) {
    await next();
    return;
  }

  let inputText: string | null = null;

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
      formData.append("tg_id", ctx.from?.id.toString() || "unknown");

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

  if (!inputText || inputText.startsWith("/")) {
    await next();
    return;
  }

  const parsed = parseTransactionMessage(inputText);
  if (!parsed) {
    await next();
    return;
  }

  ctx.state.parsedTransaction = parsed;
  await ctx.reply(buildReply(parsed.type, parsed.amount, parsed.note, parsed.currency));
};
