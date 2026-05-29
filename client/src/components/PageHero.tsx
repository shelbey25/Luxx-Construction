import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type Crumb = { label: string; to?: string };

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  italic?: string;
  description?: string;
  image: string;
  imageAlt?: string;
  crumbs?: Crumb[];
};

export function PageHero({
  eyebrow,
  title,
  italic,
  description,
  image,
  imageAlt = "",
  crumbs = [],
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-ink-900 pt-28 sm:pt-32 md:pt-40">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(200,167,101,0.18),transparent_55%)]"
      />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 sm:px-6 md:grid-cols-12 md:gap-12 md:pb-24 md:px-10">
        <div className="md:col-span-7">
          {crumbs.length > 0 && (
            <nav className="mb-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] uppercase tracking-luxe text-bone-300/80">
              {crumbs.map((c, i) => (
                <span key={`${c.label}-${i}`} className="inline-flex items-center gap-2">
                  {c.to ? (
                    <Link to={c.to} className="hover:text-gold-300">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-gold-300">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && (
                    <span className="text-bone-400">|</span>
                  )}
                </span>
              ))}
            </nav>
          )}

          {eyebrow && <p className="eyebrow">{eyebrow}</p>}

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="display mt-4 text-[40px] text-bone-100 sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {title}
            {italic && (
              <>
                {" "}
                <span className="italic text-gold-300">{italic}</span>
              </>
            )}
          </motion.h1>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-bone-200/80 sm:text-lg"
            >
              {description}
            </motion.p>
          )}
        </div>

        <div className="md:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-bone-100/10 shadow-ink md:aspect-[4/5]"
          >
            <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
