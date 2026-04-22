import { MiddlewareFn } from "telegraf";
import { BotContext } from "../types";
import { normalizePhone } from "../utils/phone.util";
import { validateFullName, validatePhone } from "../utils/validators";

export const validationMiddleware = (): MiddlewareFn<BotContext> => async (ctx, next) => {
  if (!ctx.session) {
    await next();
    return;
  }

  if (ctx.message && "text" in ctx.message && ctx.message.text.startsWith("/")) {
    await next();
    return;
  }
  const state = ctx.state as Record<string, unknown>;
  delete state.validatedName;
  delete state.validatedPhone;
  delete state.contactOwnerMismatch;

  if (ctx.session.step === "name" && ctx.message && "text" in ctx.message) {
    state.validatedName = validateFullName(ctx.message.text);
  }

  if (ctx.session.step === "phone" && ctx.message) {
    let rawPhone: string | null = null;

    if ("contact" in ctx.message) {
      const contact = ctx.message.contact;
      if (contact.user_id && ctx.from && contact.user_id !== ctx.from.id) {
        state.contactOwnerMismatch = true;
      } else {
        rawPhone = contact.phone_number;
      }
    }

    if ("text" in ctx.message) {
      rawPhone = ctx.message.text;
    }

    const normalized = rawPhone ? normalizePhone(rawPhone) : null;
    state.validatedPhone = normalized && validatePhone(normalized) ? normalized : null;
  }

  await next();
};
