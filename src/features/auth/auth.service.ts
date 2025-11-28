const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./user.model");
const responseBase = require("../../utils/responseBase");
import type { Request, Response } from "express";

exports.signUp = async (req: Request, res: Response) => {
  const { userName, email, password, acceptTerms } = req.body;

  if (!acceptTerms) {
    return res
      .status(400)
      .json(
        responseBase.fail("You must accept Terms of Use and Privacy Policy")
      );
  }

  try {
    const existUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existUser) {
      return res.status(400).json(responseBase.fail("User already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      userName,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    return res.status(201).json(
      responseBase.success(
        {
          id: newUser._id,
          name: newUser.userName,
          email: newUser.email,
        },
        "User created successfully"
      )
    );
  } catch (err) {
    return res.status(500).json(responseBase.fail("Server error", err));
  }
};

exports.signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existUser = await User.findOne({
      email: email.toLowerCase().trim(),
    }).select("+password userName email");

    if (!existUser) {
      return res
        .status(400)
        .json(responseBase.fail("Email or password is incorrect"));
    }

    const isPassEqual = await bcrypt.compare(password, existUser.password);
    if (!isPassEqual) {
      return res
        .status(400)
        .json(responseBase.fail("Email or password is incorrect"));
    }

    const token = jwt.sign({ userId: existUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json(
      responseBase.success(
        {
          token,
          user: {
            id: existUser._id,
            name: existUser.userName,
            email: existUser.email,
          },
        },
        "Login successful"
      )
    );
  } catch (err) {
    return res.status(500).json(responseBase.fail("Server error", err));
  }
};
