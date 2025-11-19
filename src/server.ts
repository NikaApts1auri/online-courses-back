import type { Request, Response } from "express";
const app = require("./app");
const connectToDB = require("./config/db.config");
const serverless = require("serverless-http");

const handler = serverless(app);

// შეცვალეთ module.exports ამით:
module.exports = async (req: Request, res: Response) => {
  // 1. დაამყარეთ კავშირი DB-სთან (თუ უკვე არ არის)
  try {
    if (!isDBConnected) {
      await connectToDB(); // დაელოდეთ კავშირს
      isDBConnected = true;
      console.log("Database connected on demand");
    }
  } catch (err) {
    console.error("Database connection failed during request:", err);
    return res.status(503).json({ message: "Database connection failed" });
  }

  // 2. დაამუშავეთ მოთხოვნა
  return handler(req, res);
};
