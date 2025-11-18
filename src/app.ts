const express = require("express");
const cors = require("cors");
import type { Request, Response, NextFunction } from "express";
const userRouter = require("./features/users/user.controller");
const authRouter = require("./features/auth/auth.controller");
const courseRouter = require("./features/course/course.controller");
const contactRouter = require("./features/contact/contact.controller");
const { logger } = require("./middlewares/logger.middleware");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.get("/", (req, res) => {
  res.send("API is running");
});
// API routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/course", courseRouter);
app.use("/api/contact", contactRouter);

// Only API 404
app.use("/api", (req: Request, res: Response) => {
  res.status(404).json({ message: "API route not found" });
});

module.exports = app;
