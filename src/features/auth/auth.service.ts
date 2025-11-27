const userModel = require("../users/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import type { Request, Response } from "express";
require("dotenv").config();
const responseBase = require("../../utils/responseBase");

interface AuthRequest extends Request {
  userId?: string;
}

interface SignUpBody {
  userName: string;
  email: string;
  password: string;
  acceptTerms: boolean;
}
exports.signUp = async (req: Request<{}, {}, SignUpBody>, res: Response) => {
  const { userName, email, password, acceptTerms } = req.body;

  if (!acceptTerms) {
    return res
      .status(400)
      .json({ message: "You must accept Terms of Use and Privacy Policy" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      userName,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.signIn = async (req: Request, res: Response) => {
  console.log("Incoming login request body:", req.body); // <-- აქ დაამატე
  const { email, password } = req.body;

  const existUser = await userModel
    .findOne({ email: email.toLowerCase().trim() })
    .select("password");

  if (!existUser) {
    return res.status(400).json({
      success: false,
      message: "Email or password is incorrect",
      error: true,
    });
  }

  const isPassEqual = await bcrypt.compare(password, existUser.password);
  if (!isPassEqual) {
    return res.status(400).json({
      success: false,
      message: "Email or password is incorrect",
      error: true,
    });
  }

  const payload = { userId: existUser._id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  return res.json({
    success: true,
    message: "Success",
    token,
    error: null,
  });
};

exports.currentUser = async (req: AuthRequest, res: Response) => {
  const user = await userModel.findById(req.userId).select("-password");

  res.json(responseBase.success(user));
};
