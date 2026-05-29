import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { submitContact, type ContactPayload } from "../lib/api";

const INQUIRIES: ContactPayload["inquiryType"][] = [
  "Residential",
  "Commercial",
  "Consulting",
  "Roofing",
  "Storm Damage",
  "Other",
];

export function ContactForm() {
  const [form, setForm] = useState<ContactPayload>({
    name: "",
    email: "",
    phone: "",
    inquiryType: "Residential",
    message: "",
    company: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof ContactPayload>(key: K, value: ContactPayload[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      await submitContact({
        ...form,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone?.trim() || undefined,
        message: form.message.trim(),
      });
      setStatus("ok");
      setForm({
        name: "",
        email: "",
        phone: "",
        inquiryType: "Residential",
        message: "",
        company: "",
      });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-ink-900 py-20 sm:py-24 md:py-36">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,rgba(200,167,101,0.12),transparent_55%)]"
      />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 md:grid-cols-12 md:gap-16 md:px-10">
        <div className="md:col-span-5">
          <p className="eyebrow">Get in touch</p>
          <h2 className="display mt-4 text-[34px] sm:text-4xl md:text-6xl">
            Ready to <span className="italic text-gold-300">get started?</span>
          </h2>
          <p className="mt-6 max-w-md text-bone-200/80">
            Complete the form and a member of our team will contact you at their
            earliest convenience. Homeowners, businesses and professionals across
            almost every industry trust LUXX.
          </p>

          <div className="mt-10 space-y-5 text-sm">
            <a
              href="tel:+17727754908"
              className="group flex items-center gap-4 text-bone-100 hover:text-gold-300"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-bone-100/15 group-hover:border-gold-500">
                <Phone size={16} />
              </span>
              +1 (772) 775-4908
            </a>
            <a
              href="mailto:info@luxxfl.com"
              className="group flex items-center gap-4 text-bone-100 hover:text-gold-300"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-bone-100/15 group-hover:border-gold-500">
                <Mail size={16} />
              </span>
              info@luxxfl.com
            </a>
            <div className="flex items-center gap-4 text-bone-200">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-bone-100/15">
                <MapPin size={16} />
              </span>
              Ocean Breeze, Florida
            </div>
            <div className="flex items-center gap-4 text-bone-200">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-bone-100/15">
                <Clock size={16} />
              </span>
              Mon – Fri · 8:00 AM – 6:00 PM
            </div>
          </div>
        </div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="md:col-span-7 rounded-3xl border border-bone-100/10 bg-ink-800/70 p-6 backdrop-blur-xl sm:p-8 md:p-10"
        >
          {/* Honeypot */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            className="hidden"
            aria-hidden
          />

          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="eyebrow">Name *</span>
              <input
                required
                minLength={2}
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="field mt-2"
                placeholder="Jane Doe"
              />
            </label>
            <label className="block">
              <span className="eyebrow">Email *</span>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="field mt-2"
                placeholder="you@email.com"
              />
            </label>
            <label className="block">
              <span className="eyebrow">Phone</span>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="field mt-2"
                placeholder="(555) 555-5555"
              />
            </label>
            <label className="block">
              <span className="eyebrow">Inquiry Type *</span>
              <select
                value={form.inquiryType}
                onChange={(e) =>
                  update("inquiryType", e.target.value as ContactPayload["inquiryType"])
                }
                className="field mt-2"
              >
                {INQUIRIES.map((i) => (
                  <option key={i} value={i} className="bg-ink-800">
                    {i}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="mt-6 block">
            <span className="eyebrow">Project Details *</span>
            <textarea
              required
              minLength={10}
              maxLength={4000}
              rows={6}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              className="field mt-2 resize-y"
              placeholder="Tell us about your project — scope, timeline, location and anything else helpful."
            />
          </label>

          <div className="mt-8 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <p className="text-xs text-bone-400">
              We respond within one business day.
            </p>
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-gold disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send Request"}
            </button>
          </div>

          {status === "ok" && (
            <p className="mt-6 rounded-xl border border-gold-500/30 bg-gold-500/10 p-4 text-sm text-gold-100">
              Thank you — your request has been received. A member of our team
              will reach out shortly.
            </p>
          )}
          {status === "error" && error && (
            <p className="mt-6 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-200">
              {error}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
