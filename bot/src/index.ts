import "dotenv/config";
import { Telegraf } from "telegraf";
import { PrismaClient } from "@prisma/client";
import { UserService } from "./services/user.service";
import { antiSpamMiddleware } from "./middlewares/anti-spam.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";
import { sessionMiddleware } from "./middlewares/session.middleware";
import { validationMiddleware } from "./middlewares/validation.middleware";
import { startHandler } from "./handlers/start.handler";
import {
  confirmRegistrationHandler,
  registerMessageHandler,
  registrationActionData,
  restartRegistrationHandler,
} from "./handlers/register.handler";

const botToken = process.env.BOT_TOKEN;

if (!botToken) {
  throw new Error("BOT_TOKEN .env faylda berilmagan");
}

const userService = new UserService();
const bot = new Telegraf(botToken);

bot.use(errorMiddleware());
bot.use(antiSpamMiddleware());
bot.use(sessionMiddleware());
bot.use(validationMiddleware());

bot.start(startHandler(userService));
bot.on(["text", "contact"], registerMessageHandler());
bot.action(registrationActionData.confirm, confirmRegistrationHandler(userService));
bot.action(registrationActionData.restart, restartRegistrationHandler());

bot.launch().then(() => {
  console.log("Bot ishga tushdi");
});

process.once("SIGINT", async () => {
  bot.stop("SIGINT");
  await prisma.$disconnect();
});

process.once("SIGTERM", async () => {
  bot.stop("SIGTERM");
  await prisma.$disconnect();
});
