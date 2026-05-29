import express from "express";
import notesRouter from "./routes/notes.routes.js";
import authRouter from "./routes/auth.routes.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/notes", notesRouter);
app.use("/api/auth", authRouter);

export default app;
