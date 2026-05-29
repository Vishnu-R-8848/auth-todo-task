import app from "./src/app.js";
import "dotenv/config.js";
import connectDB from "./src/config/db.js";

// Connect to MongoDB before starting the Express server.
connectDB();

// Use the PORT value from the .env file, or fall back to 4000 for local development.
const PORT = process.env.PORT || 4000;

// Start listening for incoming HTTP requests.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
