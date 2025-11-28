const userModel = require("../users/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  const { userName, email, password, acceptTerms } = req.body;

  if (!acceptTerms) {
    return res.status(400).json({
      success: false,
      message: "You must accept Terms of Use and Privacy Policy",
      error: true,
    });
  }

  try {
    const existingUser = await userModel.findOne({
      email: email.toLowerCase().trim(),
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
        error: true,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      userName,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.userName,
        email: newUser.email,
      },
      error: null,
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: true });
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existUser = await userModel
      .findOne({ email: email.toLowerCase().trim() })
      .select("password userName email");
    if (!existUser) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Email or password is incorrect",
          error: true,
        });
    }

    const isPassEqual = await bcrypt.compare(password, existUser.password);
    if (!isPassEqual) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Email or password is incorrect",
          error: true,
        });
    }

    const token = jwt.sign({ userId: existUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({
      success: true,
      message: "Success",
      token,
      user: {
        id: existUser._id,
        name: existUser.userName,
        email: existUser.email,
      },
      error: null,
    });
  } catch (err) {
    console.error("Sign-in error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: true });
  }
};

exports.currentUser = async (req, res) => {
  const user = await userModel.findById(req.userId).select("-password");
  res.json({ success: true, data: user, message: "Success", error: null });
};
