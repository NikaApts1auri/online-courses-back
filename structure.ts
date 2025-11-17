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
