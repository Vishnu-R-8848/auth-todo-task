import mongoose from "mongoose";
import UserModel from "../models/users.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// ---- create a user ----
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // ---- validation ----
  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()-+])[A-Za-z\d!@#$%^&*()-+]{6,}$/;

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error:
        "Password must be at least 6 characters long and contain both letters, numbers and special characters.",
    });
  }

  if (username.trim().length < 3) {
    return res
      .status(400)
      .json({ error: "Username must be at least 3 characters long" });
  }

  // ---- if validation passed, create the user ----
  const newUser = await UserModel.create({
    username,
    email,
    password: await bcrypt.hash(password, 10),
  });

  const token = jwt.sign(
    { userId: newUser._id, username: newUser.username, email: newUser.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h", // Token expires in 1 hour
    },
  );

  // ---- set the token in an HTTP-only cookie ----

  res.cookie("token", token);

  return res.status(201).json({
    message: "User registered successfully",
    user: newUser,
  });
};

// ---- login user ----
export const loginUser = async (req, res) => {
  let { email, password } = req.body;

  // ---- validation ----
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()-+])[A-Za-z\d!@#$%^&*()-+]{6,}$/;

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error:
        "Password must be at least 6 characters long and contain both letters, numbers and special characters.",
    });
  }

  // ---- if validation passed, find the user ----
  const user = await UserModel.findOne({ email });

  // ---- if user not found ----
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // ---- if user found, generate a token ----
  // const isMatch = await bcrypt.compare(password, user.password);

  // if (!isMatch) {
  //   return res.status(401).json({ error: "Invalid credentials" });
  // }

  // ---- using the method defined in the user model to compare passwords ----

  if(!(await user.matchPassword(password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { userId: user._id, username: user.username, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );

  // ---- set the token in an HTTP-only cookie ----
  res.cookie("token", token);

  return res.status(200).json({
    message: "User logged in successfully",
    user,
  });
};
