import type { Request, Response, NextFunction } from "express";
const express = require("express");
const path = require("path");
const cors = require("cors");
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
    origin: [
      "https://online-courses-front.vercel.app",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Static files
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/courses", courseRouter);
app.use("/api/contact", contactRouter);

// Root route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is running!",
    documentation: "Access API routes via /api/...",
  });
});

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

// Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

module.exports = app;
