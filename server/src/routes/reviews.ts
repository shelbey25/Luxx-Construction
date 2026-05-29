import { Router } from "express";
import { z } from "zod";
import { nanoid } from "nanoid";
import { readJson, writeJson } from "../storage/jsonStore.js";
import { sendMail } from "../services/mailer.js";

export const reviewsRouter = Router();

export type Review = {
  id: string;
  name: string;
  location?: string;
  rating: number;
  title?: string;
  body: string;
  createdAt: string;
  approved: boolean;
};

const SEED: Review[] = [
  {
    id: "seed-1",
    name: "Marcus & Elena Whitfield",
    location: "Jupiter Island, FL",
    rating: 5,
    title: "A team that delivers on every promise",
    body:
      "From the first walkthrough to final handoff, the LUXX team treated our home like their own. Craftsmanship, communication and timelines were flawless.",
    createdAt: "2026-03-12T15:00:00.000Z",
    approved: true,
  },
  {
    id: "seed-2",
    name: "Priya Subramanian",
    location: "Stuart, FL",
    rating: 5,
    title: "Storm restoration done right",
    body:
      "After Hurricane season we were lost. LUXX handled the roofing, insurance estimating and full restoration. They are the only call we make now.",
    createdAt: "2026-02-02T12:00:00.000Z",
    approved: true,
  },
  {
    id: "seed-3",
    name: "Devon Carter",
    location: "Palm Beach Gardens, FL",
    rating: 5,
    title: "True luxury build experience",
    body:
      "Our commercial build came in on schedule and exceeded the design brief. The finishing detail is on another level.",
    createdAt: "2025-12-19T18:00:00.000Z",
    approved: true,
  },
];

async function loadAll(): Promise<Review[]> {
  const stored = await readJson<Review[] | null>("reviews.json", null);
  if (!stored || stored.length === 0) {
    await writeJson("reviews.json", SEED);
    return SEED;
  }
  return stored;
}

const ReviewSchema = z.object({
  name: z.string().min(2).max(80),
  location: z.string().max(80).optional().or(z.literal("")),
  rating: z.number().int().min(1).max(5),
  title: z.string().max(120).optional().or(z.literal("")),
  body: z.string().min(10).max(1500),
  company: z.string().max(0).optional(), // honeypot
});

reviewsRouter.get("/", async (_req, res) => {
  const all = await loadAll();
  res.json({
    reviews: all
      .filter((r) => r.approved)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
  });
});

reviewsRouter.post("/", async (req, res) => {
  const parsed = ReviewSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
  }
  if (parsed.data.company && parsed.data.company.length > 0) {
    return res.status(202).json({ ok: true });
  }
  const autoApprove = String(process.env.REVIEWS_AUTO_APPROVE ?? "true") === "true";
  const review: Review = {
    id: nanoid(12),
    name: parsed.data.name,
    location: parsed.data.location || undefined,
    rating: parsed.data.rating,
    title: parsed.data.title || undefined,
    body: parsed.data.body,
    createdAt: new Date().toISOString(),
    approved: autoApprove,
  };
  const all = await loadAll();
  all.unshift(review);
  await writeJson("reviews.json", all);

  // Notify the team that a review came in.
  try {
    await sendMail({
      subject: `${autoApprove ? "New review posted" : "Review pending approval"} — ${review.name} (${review.rating}★)`,
      text: `${review.name}${review.location ? " · " + review.location : ""}\n${review.rating}★\n\n${review.title ? review.title + "\n\n" : ""}${review.body}`,
      html: `<p><strong>${review.name}</strong>${review.location ? " · " + review.location : ""}</p><p>${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</p>${review.title ? `<h3>${review.title}</h3>` : ""}<p style="white-space:pre-wrap">${review.body}</p>`,
    });
  } catch (e) {
    console.error("[reviews] mail failed:", e);
  }

  res.status(201).json({ ok: true, review: autoApprove ? review : { ...review, body: "" } });
});
