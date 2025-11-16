const jwt = require("jsonwebtoken");
import type { Request, Response, NextFunction } from "express";
require("dotenv").config();

interface AuthRequest extends Request {
  userId?: string;
}

module.exports = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "token not provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "token not provided" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };

    req.userId = payload.userId;
    next();
  } catch (e) {
    return res.status(401).json({ message: "token is expired" });
  }
};
