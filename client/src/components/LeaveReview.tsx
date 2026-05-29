import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Check } from "lucide-react";
import { submitReview } from "../lib/api";

export function LeaveReview() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      await submitReview({
        name: name.trim(),
        location: location.trim() || undefined,
        rating,
        title: title.trim() || undefined,
        body: body.trim(),
        company,
      });
      setStatus("ok");
      setName("");
      setLocation("");
      setRating(5);
      setTitle("");
      setBody("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section className="relative bg-ink-800 py-20 sm:py-24 md:py-36">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 md:grid-cols-12 md:gap-16 md:px-10">
        <div className="md:col-span-5">
          <p className="eyebrow">Share Your Experience</p>
          <h2 className="display mt-4 text-[32px] sm:text-4xl md:text-5xl">
            Worked with LUXX?{" "}
            <span className="italic text-gold-300">Tell your story.</span>
          </h2>
          <p className="mt-6 max-w-md text-bone-200/80">
            Your words help fellow Florida homeowners and businesses choose with
            confidence. Reviews are read by our team and may appear on this site.
          </p>
          <div className="mt-8 hairline" />
          <ul className="mt-8 space-y-3 text-sm text-bone-300">
            <li className="flex gap-3"><Check size={16} className="mt-0.5 text-gold-300" /> Honest, unedited feedback welcome</li>
            <li className="flex gap-3"><Check size={16} className="mt-0.5 text-gold-300" /> No account or login required</li>
            <li className="flex gap-3"><Check size={16} className="mt-0.5 text-gold-300" /> We notify our team on every submission</li>
          </ul>
        </div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="md:col-span-7 rounded-3xl border border-bone-100/10 bg-ink-900/70 p-6 backdrop-blur-xl sm:p-8 md:p-10"
        >
          {/* Honeypot */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="hidden"
            aria-hidden
          />

          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="eyebrow">Name</span>
              <input
                required
                minLength={2}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="field mt-2"
                placeholder="Your full name"
              />
            </label>
            <label className="block">
              <span className="eyebrow">City (optional)</span>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="field mt-2"
                placeholder="Stuart, FL"
              />
            </label>
          </div>

          <div className="mt-6">
            <span className="eyebrow">Rating</span>
            <div className="mt-2 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => {
                const n = i + 1;
                const active = (hover || rating) >= n;
                return (
                  <button
                    type="button"
                    key={n}
                    onMouseEnter={() => setHover(n)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(n)}
                    aria-label={`${n} star${n > 1 ? "s" : ""}`}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-6 w-6 sm:h-7 sm:w-7 ${active ? "text-gold-300" : "text-bone-100/20"}`}
                      fill={active ? "currentColor" : "transparent"}
                      strokeWidth={1.25}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <label className="mt-6 block">
            <span className="eyebrow">Headline (optional)</span>
            <input
              maxLength={120}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="field mt-2"
              placeholder="A short summary"
            />
          </label>

          <label className="mt-6 block">
            <span className="eyebrow">Your Review</span>
            <textarea
              required
              minLength={10}
              maxLength={1500}
              rows={5}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="field mt-2 resize-y"
              placeholder="Tell us about your project and the LUXX experience…"
            />
          </label>

          <div className="mt-8 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <p className="text-xs text-bone-400">
              By submitting you agree your review may be displayed publicly.
            </p>
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-gold disabled:opacity-60"
            >
              {status === "sending" ? "Submitting…" : "Submit Review"}
            </button>
          </div>

          {status === "ok" && (
            <p className="mt-6 rounded-xl border border-gold-500/30 bg-gold-500/10 p-4 text-sm text-gold-100">
              Thank you — your review has been received.
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
