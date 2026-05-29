import bcrypt from "bcryptjs";
import mongoose from "mongoose";

// User schema defines how user documents are stored in MongoDB.
const userSchema = new mongoose.Schema({
  // The display name for the user.
  username: {
    type: String,
    required: true,
    trim: true,
  },
  // Email is unique and is normalized to lowercase before being saved.
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  // Password stores the hashed password, not the original plain text password.
  password: {
    type: String,
    required: true,
  },
});

// Runs before saving a user document and hashes the password when it has changed.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    // A salt makes the hashed password harder to attack even if two users share a password.
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    console.error("Error hashing password", err);
  }
});

// Compares a login password with the hashed password stored for this user.
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export the User model so controllers can query the users collection.
const UserModel = mongoose.model("User", userSchema);
export default UserModel;
