import mongoose from "mongoose";

// Connects the application to MongoDB using the connection string from the .env file.
const connectDB = async () => {
  try {
    // mongoose.connect opens the database connection used by all Mongoose models.
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    // Log connection errors so database setup problems are easier to debug.
    console.error("MongoDB connection error:", error);
  }
}

export default connectDB;
