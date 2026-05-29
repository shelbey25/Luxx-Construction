import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { contactRouter } from "./routes/contact.js";
import { reviewsRouter } from "./routes/reviews.js";
import { adminRouter } from "./routes/admin.js";

const app = express();
const PORT = Number(process.env.PORT ?? 4000);

function normalizeOrigin(origin: string): string {
  return origin.trim().replace(/\/$/, "");
}

const allowedOrigins = (process.env.CLIENT_ORIGIN ?? "http://localhost:5173")
  .split(",")
  .map(normalizeOrigin)
  .filter(Boolean);

app.use(express.json({ limit: "32kb" }));
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }

      const normalizedOrigin = normalizeOrigin(origin);
      callback(null, allowedOrigins.includes(normalizedOrigin));
    },
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(
  "/api/",
  rateLimit({
    windowMs: 60_000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.use("/api/contact", contactRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/admin", adminRouter);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("[server] error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`[luxx-server] listening on http://localhost:${PORT}`);
});
