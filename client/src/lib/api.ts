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

const BASE = (import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? "/api") as string;

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

// ----- Admin -----

const ADMIN_TOKEN_KEY = "luxx_admin_token";

export function getAdminToken(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(ADMIN_TOKEN_KEY) ?? "";
}

export function setAdminToken(token: string): void {
  window.localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearAdminToken(): void {
  window.localStorage.removeItem(ADMIN_TOKEN_KEY);
}

export type ContactRequest = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  inquiryType: ContactPayload["inquiryType"];
  message: string;
  createdAt: string;
};

async function adminFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const token = getAdminToken();
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${token}`);
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  return fetch(`${BASE}/admin${path}`, { ...init, headers });
}

export async function adminVerify(): Promise<boolean> {
  const r = await adminFetch("/me");
  return r.ok;
}

export async function adminListContacts(): Promise<ContactRequest[]> {
  const r = await adminFetch("/contact");
  if (!r.ok) throw new Error("Failed to load requests");
  const data = (await r.json()) as { requests: ContactRequest[] };
  return data.requests;
}

export async function adminDeleteContact(id: string): Promise<void> {
  const r = await adminFetch(`/contact/${id}`, { method: "DELETE" });
  if (!r.ok) throw new Error("Failed to delete request");
}

export async function adminListReviews(): Promise<Review[]> {
  const r = await adminFetch("/reviews");
  if (!r.ok) throw new Error("Failed to load reviews");
  const data = (await r.json()) as { reviews: Review[] };
  return data.reviews;
}

export async function adminSetReviewApproved(
  id: string,
  approved: boolean,
): Promise<void> {
  const r = await adminFetch(`/reviews/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ approved }),
  });
  if (!r.ok) throw new Error("Failed to update review");
}

export async function adminDeleteReview(id: string): Promise<void> {
  const r = await adminFetch(`/reviews/${id}`, { method: "DELETE" });
  if (!r.ok) throw new Error("Failed to delete review");
}
