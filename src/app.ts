const express = require("express");
const cors = require("cors");
const userRouter = require("./features/users/user.controller");
const { logger } = require("./middlewares/logger.middleware");
const authRouter = require("./features/auth/auth.controller");
const courseRouter = require("./features/course/course.controller");
const contactRouter = require("./features/contact/contact.controller");
import type { Request, Response, NextFunction } from "express";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// CORS
app.use(
  cors({
    origin: "*", // ან კონკრეტული frontend URL, მაგალითად "http://localhost:3000"
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/course", courseRouter);
app.use("/api/contact", contactRouter);

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(
  (
    err: Error & { status?: number },
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error(err.stack);
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Server Error" });
  }
);

module.exports = app;
