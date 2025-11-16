import type { Request, Response, NextFunction } from "express";
module.exports =
  (roles: (string | string[] | undefined)[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const role = req.headers["role"];
    if (!roles.includes(role)) {
      return res.status(403).json({ message: "permition denied" });
    }

    next();
  };
