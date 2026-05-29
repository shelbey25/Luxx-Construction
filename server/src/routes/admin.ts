import { Router, type Request, type Response, type NextFunction } from "express";
import { loadAllContacts, saveAllContacts } from "./contact.js";
import { loadAll as loadAllReviews, saveAll as saveAllReviews } from "./reviews.js";

export const adminRouter = Router();

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const expected = process.env.ADMIN_TOKEN?.trim() || "adminpass";
  const header = req.header("authorization") ?? "";
  const token = header.toLowerCase().startsWith("bearer ")
    ? header.slice(7).trim()
    : "";
  if (token !== expected) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

adminRouter.use(requireAdmin);

adminRouter.get("/me", (_req, res) => {
  res.json({ ok: true });
});

// Contact requests
adminRouter.get("/contact", async (_req, res) => {
  const all = await loadAllContacts();
  res.json({
    requests: all
      .slice()
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
  });
});

adminRouter.delete("/contact/:id", async (req, res) => {
  const all = await loadAllContacts();
  const next = all.filter((r) => r.id !== req.params.id);
  if (next.length === all.length) {
    return res.status(404).json({ error: "Not found" });
  }
  await saveAllContacts(next);
  res.json({ ok: true });
});

// Reviews
adminRouter.get("/reviews", async (_req, res) => {
  const all = await loadAllReviews();
  res.json({
    reviews: all
      .slice()
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
  });
});

adminRouter.patch("/reviews/:id", async (req, res) => {
  const body = req.body as { approved?: boolean } | undefined;
  if (!body || typeof body.approved !== "boolean") {
    return res.status(400).json({ error: "Body must include approved:boolean" });
  }
  const all = await loadAllReviews();
  const idx = all.findIndex((r) => r.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  all[idx] = { ...all[idx], approved: body.approved };
  await saveAllReviews(all);
  res.json({ ok: true, review: all[idx] });
});

adminRouter.delete("/reviews/:id", async (req, res) => {
  const all = await loadAllReviews();
  const next = all.filter((r) => r.id !== req.params.id);
  if (next.length === all.length) {
    return res.status(404).json({ error: "Not found" });
  }
  await saveAllReviews(next);
  res.json({ ok: true });
});
