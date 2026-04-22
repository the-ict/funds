// I should integrate with uzbekvoice.ai to understand the speech input and convert it to text, and then process the text input to identify the intent and respond accordingly. I should also use a natural language processing library like natural or compromise to help with understanding the user's input and generating a natural response. I should also use a database like MongoDB or PostgreSQL to store the transactions and categories, and use an ORM like Mongoose or Sequelize to interact with the database. I should also implement authentication and authorization to ensure that only authorized users can access the bot and their data. Finally, I should deploy the bot on a cloud platform like Heroku or AWS to make it accessible to users.
// I should also implement a deepseek service to make a decition based on input converted with uzbekvoice.ai
// I need to implement to get all the informations like transactions, categories, analytics, filtering things and more.
// I should also implement a feature to allow users to export their data in a CSV or Excel format for easy analysis and reporting. Additionally, I should implement a feature to allow users to set reminders for upcoming bills or payments, and send notifications to remind them. Finally, I should also implement a feature to allow users to connect their bank accounts and automatically import transactions, which will save them time and effort in logging their expenses and income manually.

import type { NextFunction, Request, Response } from "express";
import logger from "./utils/loggers.js";
import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

// routes
import transactionsRouter from "./routers/transactions.route";
import categoriesRouter from "./routers/categories.route";
import uzbekVoiceRouter from "./routers/uzbekvoice.route";
import usersRouter from "./routers/users.route";

// configure dotenv
dotenv.config();

// initialize express
const app = express();

// middlewares
app.use(helmet());
app.use(morgan("combined"));
app.use(cors({
    origin: "http://localhost:5000",
}));
app.use(express.json());

// routes
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/transactions', transactionsRouter);
app.use('/voice', uzbekVoiceRouter);

app.get("/", (req: Request, res: Response) => {
    res.send("Working !");
});

// error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send("Something broke!");
});

// start server
app.listen(3000, () => {
    logger.info("Server is running on port 3000");
});