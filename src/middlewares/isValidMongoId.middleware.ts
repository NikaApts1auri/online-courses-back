const { isValidObjectId } = require("mongoose");
import type { Request, Response, NextFunction } from "express";

module.exports = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Wrong Id is provided" });
  }

  next();
};
