import type { Request, Response, NextFunction } from "express";
exports.logger = (req: Request, res: Response, next: NextFunction) => {
  const time = Date.now();

  res.on("finish", () => {
    const finishTime = Date.now() - time;
    console.log(req.method, req.originalUrl, res.statusCode, `${finishTime}ms`);
  });

  next();
};
