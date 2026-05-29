import express from "express";
import notesRouter from "./routes/notes.routes.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/notes", notesRouter);
app.use("/api/auth", authRouter);

export default app;
