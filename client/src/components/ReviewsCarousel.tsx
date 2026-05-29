import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { fetchReviews, type Review } from "../lib/api";

function Stars({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1 text-gold-300">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          fill={i < value ? "currentColor" : "transparent"}
          strokeWidth={1.25}
        />
      ))}
    </div>
  );
}

export function ReviewsCarousel() {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    let cancelled = false;
    fetchReviews()
      .then((r) => !cancelled && setReviews(r))
      .catch((e) => !cancelled && setError(String(e.message ?? e)));
    return () => {
      cancelled = true;
    };
  }, []);

  const items = useMemo(() => reviews ?? [], [reviews]);

  const go = useCallback(
    (delta: number) => {
      if (items.length === 0) return;
      setDirection(delta);
      setIndex((i) => (i + delta + items.length) % items.length);
    },
    [items.length]
  );

  useEffect(() => {
    if (items.length < 2) return;
    const id = window.setInterval(() => go(1), 7000);
    return () => window.clearInterval(id);
  }, [items.length, go]);

  const current = items[index];

  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-ink-900 py-20 sm:py-24 md:py-36"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(200,167,101,0.10),transparent_60%)]"
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-6 md:px-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Trusted by Florida</p>
            <h2 className="display mt-4 text-[34px] sm:text-4xl md:text-6xl">
              What our clients <span className="italic text-gold-300">say.</span>
            </h2>
          </div>
          <div className="hidden gap-2 md:flex">
            <button
              aria-label="Previous review"
              onClick={() => go(-1)}
              className="rounded-full border border-bone-100/15 p-3 text-bone-100 transition hover:border-gold-500 hover:text-gold-300"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              aria-label="Next review"
              onClick={() => go(1)}
              className="rounded-full border border-bone-100/15 p-3 text-bone-100 transition hover:border-gold-500 hover:text-gold-300"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="relative mt-10 min-h-[360px] rounded-3xl border border-bone-100/10 bg-ink-800/60 p-6 sm:mt-14 sm:p-8 sm:min-h-[340px] md:p-14">
          <Quote className="absolute -top-5 left-5 h-12 w-12 text-gold-500/30 sm:-top-6 sm:left-8 sm:h-16 sm:w-16" />

          {error && (
            <p className="text-sm text-rose-300">Couldn’t load reviews: {error}</p>
          )}

          {!error && reviews === null && (
            <div className="space-y-4 animate-pulse">
              <div className="h-3 w-24 rounded bg-bone-100/10" />
              <div className="h-6 w-2/3 rounded bg-bone-100/10" />
              <div className="h-4 w-full rounded bg-bone-100/10" />
              <div className="h-4 w-5/6 rounded bg-bone-100/10" />
            </div>
          )}

          {current && (
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 40 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <Stars value={current.rating} />
                {current.title && (
                  <h3 className="mt-4 font-display text-xl text-bone-100 sm:mt-5 sm:text-2xl md:text-3xl">
                    “{current.title}”
                  </h3>
                )}
                <p className="mt-4 text-base leading-relaxed text-bone-200/85 sm:mt-5 sm:text-lg md:text-xl">
                  {current.body}
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 font-display text-lg text-gold-300">
                    {current.name
                      .split(" ")
                      .map((p) => p[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-bone-100">{current.name}</p>
                    {current.location && (
                      <p className="text-xs uppercase tracking-[0.18em] text-bone-300">
                        {current.location}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Indicators */}
        {items.length > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {items.map((r, i) => (
              <button
                key={r.id}
                aria-label={`Go to review ${i + 1}`}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index ? "w-8 bg-gold-500" : "w-2 bg-bone-100/20"
                }`}
              />
            ))}
          </div>
        )}

        {/* Mobile arrows */}
        <div className="mt-6 flex justify-center gap-2 md:hidden">
          <button onClick={() => go(-1)} className="btn-ghost px-5 py-2 text-xs">
            <ChevronLeft size={14} /> Prev
          </button>
          <button onClick={() => go(1)} className="btn-ghost px-5 py-2 text-xs">
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
