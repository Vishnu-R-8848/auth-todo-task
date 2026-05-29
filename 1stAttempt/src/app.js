import express from "express";
import notesRouter from "./routes/notes.routes.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

// Create the main Express application.
const app = express();

// Parse JSON request bodies so controllers can read req.body.
app.use(express.json());

// Parse cookies so controllers can read the JWT token from req.cookies.
app.use(cookieParser());

// Basic health/home route to confirm the API is running.
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Mount note routes under /api/notes.
app.use("/api/notes", notesRouter);

// Mount authentication routes under /api/auth.
app.use("/api/auth", authRouter);

export default app;
