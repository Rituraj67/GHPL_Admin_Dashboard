import { sendOTP } from "../utils/sendOTP.js";
import { generateToken } from "../utils/generateToken.js";
import User from "../models/User.js";

export const sendOtpToEmail = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    const user = await User.findOne({ where: { email } });
    console.log(user);
    if (!user || !user.isAuthorized)
      return res.status(403).json({ message: "Email not authorized" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 3 * 60 * 1000); // 3 minutes from now

    user.otp = otp;
    user.otpExpiresAt = expiresAt;
    await user.save();

    await sendOTP(email, otp);

    res.status(200).json({ message: "OTP sent successfully!" });
  } catch (error) {
    res.status(500).send(error)
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ where: { email } });

  const now = new Date();

  if (
    user &&
    user.otp === otp &&
    user.otpExpiresAt &&
    now < user.otpExpiresAt
  ) {
    const token = generateToken(user.id, user.name);

    const isCrossSite = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isCrossSite,
      sameSite: isCrossSite ? "None" : "Lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Optional: Clear OTP after successful verification
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    const usersCount = await User.count({
      where: { isAuthorized: true },
    });

    return res
      .status(200)
      .json({ message: "Authenticated", name: user.name, count: usersCount });
  }

  res.status(400).json({ message: "Invalid or expired OTP" });
};

export const refreshLogin = async (req, res) => {
  console.log(req.userId, req.name);
  try {
    if (req.userId) {
      const usersCount = await User.count({
        where: { isAuthorized: true },
      });
      res
        .status(200)
        .send({ message: "Token Verified", name: req.name, count: usersCount });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid Token" });
  }
};

export const logoutUser = (req, res) => {
  const isCrossSite = process.env.NODE_ENV === "production";
  res.clearCookie("token", {
    httpOnly: true,
    secure: isCrossSite,
    sameSite: isCrossSite ? "None" : "Lax",
  });

  return res.status(200).json({ message: "Logout successful" });
};

export const addUser = async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const newUser = await User.create({ email, name });

    res.status(201).json({
      message: "User created successfully.",
      user: newUser,
    });
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).json({ message: "Internal Server Error." });
  }
};
