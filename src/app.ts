const express = require("express");
const userRouter = require("./features/users/user.controller");
const { logger } = require("./middlewares/logger.middleware");
const connectToDB = require("./config/db.config");
const authRouter = require("./features/auth/auth.controller");
const courseRouter = require("./features/course/course.controller");

const app = express();

app.use(express.json());
app.use(logger);

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/course", courseRouter);

module.exports = app;
