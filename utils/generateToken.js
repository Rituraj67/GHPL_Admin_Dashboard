import jwt from "jsonwebtoken";

export const generateToken = (userId, name) => {
  return jwt.sign({ userId, name }, process.env.JWT_SECRET, { expiresIn: "1d" });
};