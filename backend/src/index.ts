import type { NextFunction, Request, Response } from "express";
import logger from "./utils/loggers.js";
import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

// routes
import transactionsRouter from "./routers/transactions.route.js";
import categoriesRouter from "./routers/categories.route.js";
import uzbekVoiceRouter from "./routers/uzbekvoice.route.js";
import usersRouter from "./routers/users.route.js";
import authRouter from "./routers/auth.route.js";
import analyticsRouter from "./routers/analytics.route.js";

// configure dotenv
dotenv.config();

// initialize express
const app = express();

// middlewares
app.use(helmet());
app.use(morgan("combined"));
app.use(cors({
    origin: "http://localhost:3001",
}));
app.use(express.json());

// routes
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/transactions', transactionsRouter);
app.use('/voice', uzbekVoiceRouter);
app.use('/auth', authRouter);
app.use('/analytics', analyticsRouter);

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