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

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  inquiryType:
    | "Residential"
    | "Commercial"
    | "Consulting"
    | "Roofing"
    | "Storm Damage"
    | "Other";
  message: string;
  company?: string; // honeypot
};

export type ReviewPayload = {
  name: string;
  location?: string;
  rating: number;
  title?: string;
  body: string;
  company?: string; // honeypot
};

const BASE = "/api";

export async function fetchReviews(): Promise<Review[]> {
  const r = await fetch(`${BASE}/reviews`);
  if (!r.ok) throw new Error("Failed to load reviews");
  const data = (await r.json()) as { reviews: Review[] };
  return data.reviews;
}

export async function submitReview(payload: ReviewPayload): Promise<void> {
  const r = await fetch(`${BASE}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!r.ok) {
    const err = await r.json().catch(() => ({}));
    throw new Error(err.error ?? "Failed to submit review");
  }
}

export async function submitContact(payload: ContactPayload): Promise<void> {
  const r = await fetch(`${BASE}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!r.ok) {
    const err = await r.json().catch(() => ({}));
    throw new Error(err.error ?? "Failed to send message");
  }
}
