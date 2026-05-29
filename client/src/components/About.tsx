import { motion } from "framer-motion";

const STATS = [
  { value: "20+", label: "Years Building" },
  { value: "500+", label: "Projects Delivered" },
  { value: "100%", label: "Licensed & Insured" },
  { value: "5.0★", label: "Client Rating" },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-ink-800 py-20 sm:py-24 md:py-36">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_right,rgba(200,167,101,0.10),transparent_50%)]"
      />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 md:grid-cols-12 md:gap-16 md:px-10">
        <div className="md:col-span-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-bone-100/10 shadow-ink sm:aspect-[4/5]"
          >
            <img
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80"
              alt="LUXX team on site"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <p className="eyebrow">Florida</p>
                <p className="font-display text-2xl text-bone-100">CBC #1268110</p>
              </div>
              <span className="rounded-full border border-gold-500/40 px-3 py-1 text-[10px] uppercase tracking-luxe text-gold-300">
                Family Owned
              </span>
            </div>
          </motion.div>
        </div>

        <div className="md:col-span-6">
          <p className="eyebrow">Our Company</p>
          <h2 className="display mt-4 text-[34px] sm:text-4xl md:text-6xl">
            Building for you what others can{" "}
            <span className="italic text-gold-300">only imagine.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-bone-200/80 sm:mt-8 sm:text-lg">
            Our team works with you to ensure every detail is made to your needs
            and communicates with clarity for the life of your project. Proven
            craftsmen. Premium results. Built in Florida — for Florida.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-bone-100/10 bg-bone-100/5 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-ink-800 p-5 sm:p-6">
                <p className="font-display text-2xl text-gold-300 sm:text-3xl">{s.value}</p>
                <p className="mt-2 text-[10px] uppercase tracking-luxe text-bone-300 sm:text-[11px]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-10">
            <a href="#contact" className="btn-gold">Talk to Our Team</a>
          </div>
        </div>
      </div>
    </section>
  );
}
