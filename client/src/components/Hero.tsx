import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-ink-900 pt-32 md:pt-40"
    >
      {/* Backdrop gradient */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(200,167,101,0.18),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(200,167,101,0.08),transparent_50%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.18] mix-blend-overlay bg-grain"
      />

      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 sm:px-6 md:grid-cols-12 md:gap-10 md:px-10 md:pb-32">
        {/* Copy */}
        <div className="md:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow"
          >
            South Florida · Est. Family Owned
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="display mt-5 text-[44px] text-bone-100 sm:text-5xl md:text-7xl lg:text-[88px]"
          >
            Your vision,
            <br />
            <span className="italic text-gold-300">our expertise.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-bone-200/80 sm:text-lg"
          >
            Custom solutions across every stage of South Florida construction —
            residential builds, commercial environments and expert consulting,
            delivered with craftsmanship homeowners and businesses trust.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4"
          >
            <a href="#contact" className="btn-gold">
              Start Building <ArrowRight size={16} />
            </a>
            <a href="#services" className="btn-ghost">Our Expertise</a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[10px] uppercase tracking-[0.22em] text-bone-300/80 sm:gap-x-8 sm:gap-y-4 sm:text-xs"
          >
            <span className="inline-flex items-center gap-2">
              <ShieldCheck size={14} className="text-gold-500" />
              Licensed & Insured
            </span>
            <span className="hidden h-3 w-px bg-bone-100/20 md:inline-block" />
            <span>FL CBC #1268110</span>
            <span className="hidden h-3 w-px bg-bone-100/20 md:inline-block" />
            <span>Family Owned · 20+ Yrs</span>
          </motion.div>
        </div>

        {/* Layered vignette */}
        <div className="relative md:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[320px] sm:h-[420px] md:h-[560px]"
          >
            <div className="absolute right-0 top-0 h-[78%] w-[88%] overflow-hidden rounded-3xl border border-bone-100/10 shadow-ink">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80"
                alt="LUXX luxury build"
                className="h-full w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-0 left-0 h-[55%] w-[72%] overflow-hidden rounded-3xl border border-gold-500/30 shadow-gold"
            >
              <img
                src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80"
                alt="Detail craftsmanship"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.55 }}
              className="absolute -left-2 top-6 hidden rounded-2xl border border-bone-100/10 bg-ink-800/80 px-5 py-4 text-xs text-bone-100 backdrop-blur-xl md:block"
            >
              <p className="font-display text-2xl text-gold-300">5.0★</p>
              <p className="mt-1 uppercase tracking-[0.22em] text-bone-300">
                Client Rated
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="relative border-y border-bone-100/5 bg-ink-800/50 py-4 sm:py-5">
        <div className="overflow-hidden">
          <div className="marquee-track flex w-max gap-10 px-5 text-[10px] uppercase tracking-luxe text-bone-300/70 sm:gap-16 sm:px-6 sm:text-xs">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex shrink-0 gap-10 sm:gap-16">
                <span>Residential Build</span>
                <span className="text-gold-500">◆</span>
                <span>Commercial Construction</span>
                <span className="text-gold-500">◆</span>
                <span>Luxury Design & Build</span>
                <span className="text-gold-500">◆</span>
                <span>Roofing & Storm Restoration</span>
                <span className="text-gold-500">◆</span>
                <span>3rd Party Assessments</span>
                <span className="text-gold-500">◆</span>
                <span>Property Damage Estimating</span>
                <span className="text-gold-500">◆</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
