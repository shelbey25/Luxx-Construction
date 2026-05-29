import { Router } from "express";
import { z } from "zod";
import { nanoid } from "nanoid";
import { sendMail } from "../services/mailer.js";
import { readJson, writeJson } from "../storage/jsonStore.js";

export const contactRouter = Router();

const ContactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  phone: z.string().max(40).optional().or(z.literal("")),
  inquiryType: z.enum([
    "Residential",
    "Commercial",
    "Consulting",
    "Roofing",
    "Storm Damage",
    "Other",
  ]),
  message: z.string().min(10).max(4000),
  // Honeypot — bots fill this, humans don't.
  company: z.string().max(0).optional(),
});

export type ContactRecord = z.infer<typeof ContactSchema> & {
  id: string;
  createdAt: string;
};

export async function loadAllContacts(): Promise<ContactRecord[]> {
  return readJson<ContactRecord[]>("contact-requests.json", []);
}

export async function saveAllContacts(records: ContactRecord[]): Promise<void> {
  await writeJson("contact-requests.json", records);
}

contactRouter.post("/", async (req, res) => {
  const parsed = ContactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
  }
  if (parsed.data.company && parsed.data.company.length > 0) {
    // Honeypot tripped — silently succeed.
    return res.status(202).json({ ok: true });
  }

  const record: ContactRecord = {
    ...parsed.data,
    id: nanoid(12),
    createdAt: new Date().toISOString(),
  };

  const all = await readJson<ContactRecord[]>("contact-requests.json", []);
  all.unshift(record);
  await writeJson("contact-requests.json", all);

  const subject = `New ${record.inquiryType} inquiry — ${record.name}`;
  const text = [
    `New contact request from luxxfl.com`,
    ``,
    `Name: ${record.name}`,
    `Email: ${record.email}`,
    `Phone: ${record.phone || "—"}`,
    `Inquiry Type: ${record.inquiryType}`,
    ``,
    `Message:`,
    record.message,
    ``,
    `ID: ${record.id}`,
    `Received: ${record.createdAt}`,
  ].join("\n");

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#0B0B0C;max-width:560px">
      <h2 style="color:#C8A765;margin:0 0 12px">New ${escapeHtml(record.inquiryType)} inquiry</h2>
      <p style="margin:0 0 16px">From <strong>${escapeHtml(record.name)}</strong></p>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        <tr><td style="padding:6px 0;color:#6b6b6b">Email</td><td><a href="mailto:${escapeHtml(record.email)}">${escapeHtml(record.email)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#6b6b6b">Phone</td><td>${escapeHtml(record.phone || "—")}</td></tr>
        <tr><td style="padding:6px 0;color:#6b6b6b">Type</td><td>${escapeHtml(record.inquiryType)}</td></tr>
      </table>
      <h3 style="margin:20px 0 6px">Message</h3>
      <p style="white-space:pre-wrap;line-height:1.5;background:#f6f4ef;padding:14px;border-radius:10px">${escapeHtml(record.message)}</p>
      <p style="color:#888;font-size:12px;margin-top:18px">ID ${record.id} · ${record.createdAt}</p>
    </div>
  `;

  try {
    await sendMail({ subject, text, html, replyTo: record.email });
  } catch (err) {
    console.error("[contact] mail failed:", err);
    // Don't fail the request — the record is stored. Frontend will still confirm receipt.
  }

  res.status(201).json({ ok: true, id: record.id });
});

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!)
  );
}
