import {
  validationMiddleware
} from "./middlewares/validation.middleware";
import {
  confirmRegistrationHandler,
  registerMessageHandler,
  registrationActionData,
  restartRegistrationHandler,
} from "./handlers/register.handler";
import {
  transactionMessageHandler
} from "./handlers/transaction.handler";
import {
  antiSpamMiddleware
} from "./middlewares/anti-spam.middleware";
import {
  sessionMiddleware
} from "./middlewares/session.middleware";
import {
  errorMiddleware
} from "./middlewares/error.middleware";
import {
  startHandler
} from "./handlers/start.handler";
import {
  BotContext
} from "./types";
import {
  Telegraf
} from "telegraf";
import "dotenv/config";

const botToken = process.env.BOT_TOKEN;

if (!botToken) {
  throw new Error("BOT_TOKEN .env faylda berilmagan");
};

const bot = new Telegraf<BotContext>(botToken);

bot.use(sessionMiddleware());
bot.use(antiSpamMiddleware());
bot.use(errorMiddleware());
bot.use(validationMiddleware());

bot.start(startHandler());
bot.on(["text", "contact"], registerMessageHandler());
bot.on(["text", "voice"], transactionMessageHandler());
bot.action(registrationActionData.confirm, confirmRegistrationHandler());
bot.action(registrationActionData.restart, restartRegistrationHandler());

bot.launch().then(() => {
  console.log("Bot ishga tushdi");
});

process.once("SIGINT", async () => {
  bot.stop("SIGINT");
});

process.once("SIGTERM", async () => {
  bot.stop("SIGTERM");
});
