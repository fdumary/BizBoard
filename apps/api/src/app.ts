import cors from "cors";
import express from "express";
import { authRouter } from "./routes/auth.js";
import { cardsRouter } from "./routes/cards.js";
import { templatesRouter } from "./routes/templates.js";
import { uploadRouter } from "./routes/uploads.js";
import { publicRouter } from "./routes/public.js";
import { errorHandler, notFoundHandler } from "./middleware/error.js";

const app = express();

app.use(cors({ origin: true }));
app.use(express.json({ limit: "12mb" }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRouter);
app.use("/api/cards", cardsRouter);
app.use("/api/templates", templatesRouter);
app.use("/api/uploads", uploadRouter);
app.use("/api/public", publicRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export { app };
