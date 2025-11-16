import type { Request, Response, NextFunction } from "express";
module.exports = (req: Request, res: Response, next: NextFunction) => {
  const role = req.headers["role"];

  if (role !== "ADMIN") {
    return res.status(403).json({ error: true, message: "permitioin denied" });
  }

  next();
};
