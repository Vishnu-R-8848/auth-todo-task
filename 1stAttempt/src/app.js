import express from "express";
import notesRouter from "./routes/notes.route.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/notes", notesRouter);

export default app;