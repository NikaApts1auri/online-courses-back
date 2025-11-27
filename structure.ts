// backend/
// │
// ├── .gitignore
// ├── package.json
// ├── tsconfig.json
// ├── .env
// │
// ├── dist/                  # Build output
// │
// └── src/
//     │
//     ├── app.ts             # Express app initialization
//     ├── server.ts          # Entry point (listen)
//     │
//     ├── config/
//     │   ├── env.ts         # dotenv loader + config export
//     │   └── db.ts          # MongoDB connection
//     │
//     ├── core/
//     │   ├── errors/
//     │   │   ├── ApiError.ts
//     │   │   └── errorMiddleware.ts
//     │   └── utils/
//     │       ├── logger.ts
//     │       └── validate.ts
//     │
//     ├── middlewares/       # ყველა middleware აქ იქნება
//     │   ├── auth.ts
//     │   ├── rateLimit.ts
//     │   ├── errorHandler.ts      # optional: centralized error handling
//     │   └── requestLogger.ts     # optional: logging requests
//     │
//     ├── features/
//     │   ├── auth/
//     │   │   ├── auth.controller.ts
//     │   │   ├── auth.service.ts
//     │   │
//     │   |
//     │   |__controller/
//     │       └── user.controller.ts
//     │
//     │
//     ├── routes/
//     │   └── index.ts
//     │
//     └── types/
//         └── express.d.ts
// {
//     "version": 2,

//     "builds": [
//       {
//         "src": "dist/server.js",
//         "use": "@vercel/node"
//       }
//     ],
//     "routes": [
//       {
//         "src": "/(.*)",
//         "dest": "dist/server.js",
//         "methods": ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
//       }
//     ]
//   }

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
