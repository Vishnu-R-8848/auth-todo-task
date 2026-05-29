import express from "express";
import mongoose from "mongoose";
import { registerUser, loginUser } from "../controllers/auth.controller.js";

import UserModel from "../models/users.model.js";

const router = express.Router();

/**
 * @route POST /auth/register
 * @desc Register a new user
 * @access Public
 */
router.post("/register", registerUser);

/**
 * @route POST /auth/login
 * @desc Login a user and return a JWT token
 * @access Public
 */
router.post("/login", loginUser);

export default router;
