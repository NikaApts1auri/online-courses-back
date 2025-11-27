// import type { Request, Response } from "express";
// const app = require("./app");
// const connectToDB = require("./config/db.config");
// const serverless = require("serverless-http");

// let cachedDBConnection: null = null;

// const handler = serverless(app);

// module.exports = async (req: Request, res: Response) => {
//   if (cachedDBConnection === null) {
//     try {
//       // 2. ახალი კავშირის დამყარება (მხოლოდ Cold Start-ის დროს)
//       console.log("Establishing new DB connection...");
//       cachedDBConnection = await connectToDB(); // ვიყენებთ await-ს!

//       // ეს სტრიქონები (გარდა cachedDBConnection-ისა) არ არის საჭირო, რადგან კავშირი უკვე დამყარდა
//       // isDBConnected = true;

//       console.log("Database connected and cached.");
//     } catch (err) {
//       console.error("Database connection failed during request:", err);
//       // თუ კავშირი ვერ შედგა, დააბრუნეთ 503 სტატუსი
//       cachedDBConnection = null;
//       return res
//         .status(503)
//         .json({ message: "Database connection failed, check IP Whitelist." });
//     }
//   } else {
//     console.log("Using cached DB connection.");
//   }

//   return handler(req, res);
// };

// server.ts
const express = require("express");
const connectToDB = require("./config/db.config");
import type { Request, Response } from "express";

const app = express();

// express middleware (JSON parsing)
app.use(express.json());

// PORT from environment
const PORT = process.env.PORT || 3000;

let cachedDBConnection: null = null;

// Example route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Server is running" });
});

// Start server
const startServer = async () => {
  try {
    if (!cachedDBConnection) {
      console.log("Connecting to database...");
      cachedDBConnection = await connectToDB();
      console.log("Database connected.");
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1); // დასკვნითი crash თუ DB connection ვერ შედგა
  }
};

startServer();

module.exports = app;
