import type { Request, Response } from "express";
const app = require("./app");
const connectToDB = require("./config/db.config");
const serverless = require("serverless-http");

// გამოიყენეთ ცვლადი DB კავშირის შესანახად ქეშში
// Serverless ფუნქციებში, ეს ცვლადი ინახება "ცხელი" გაშვებების დროს
let cachedDBConnection: null = null;

const handler = serverless(app);

// DB კავშირის ლოგიკა გადავიტანოთ მოთხოვნის დამმუშავებელში
module.exports = async (req: Request, res: Response) => {
  // 1. ქეშირებული კავშირის შემოწმება
  if (cachedDBConnection === null) {
    try {
      // 2. ახალი კავშირის დამყარება (მხოლოდ Cold Start-ის დროს)
      console.log("Establishing new DB connection...");
      cachedDBConnection = await connectToDB(); // ვიყენებთ await-ს!

      // ეს სტრიქონები (გარდა cachedDBConnection-ისა) არ არის საჭირო, რადგან კავშირი უკვე დამყარდა
      // isDBConnected = true;

      console.log("Database connected and cached.");
    } catch (err) {
      console.error("Database connection failed during request:", err);
      // თუ კავშირი ვერ შედგა, დააბრუნეთ 503 სტატუსი
      cachedDBConnection = null;
      return res
        .status(503)
        .json({ message: "Database connection failed, check IP Whitelist." });
    }
  } else {
    // 3. თუ კავშირი ქეშირებულია, გამოიყენეთ ის (Warm Start)
    console.log("Using cached DB connection.");
  }

  // 4. დაამუშავეთ HTTP მოთხოვნა
  return handler(req, res);
};
