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

// CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Static files
app.use(express.static(path.join(__dirname, "../public"))); // "../public" არის root public folder

// API routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/course", courseRouter);
app.use("/api/contact", contactRouter);

// Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

module.exports = app;
