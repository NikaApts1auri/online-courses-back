import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
      email: string;
      role?: string;
    };
  }
}

// Optional: Generic middleware type for TS
export type Middleware = (
  req: Request,
  res: import("express").Response,
  next: import("express").NextFunction
) => void;

// Optional: Error middleware type
export type ErrorMiddleware = (
  err: unknown,
  req: Request,
  res: import("express").Response,
  next: import("express").NextFunction
) => void;

declare namespace Express {
  export interface Request {
    userId?: string;
  }
}
