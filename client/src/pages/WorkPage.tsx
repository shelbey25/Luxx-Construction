import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PageHero } from "../components/PageHero";

const SECTIONS = [
  {
    eyebrow: "Residential",
    title: "Residential Construction",
    body: "LUXX offers custom-luxury design & build solutions across every stage of your residential building journey.",
    to: "/residential",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    eyebrow: "Commercial",
    title: "Commercial Construction",
    body: "Experts in commercial construction, able to start work at any stage of your commercial project.",
    to: "/commercial",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    eyebrow: "Consulting",
    title: "Construction Consulting",
    body: "Strategic expertise for individuals and industries across the state — insurance, real estate, engineering and more.",
    to: "/consulting",
    img: "https://images.unsplash.com/photo-1573164574511-73c773193279?auto=format&fit=crop&w=1600&q=80",
  },
];

export function WorkPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", to: "/" }, { label: "Our Work" }]}
        eyebrow="Our Work"
        title="Building for you what others can"
        italic="only imagine."
        description="Explore the breadth of our expertise across residential, commercial, and consulting engagements throughout South Florida."
        image="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80"
        imageAlt="LUXX team on site"
      />

      <section className="relative bg-ink-900 py-16 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl space-y-10 px-5 sm:px-6 md:space-y-14 md:px-10">
          {SECTIONS.map((s, i) => (
            <motion.div
              key={s.to}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.06 }}
              className="grid items-center gap-6 overflow-hidden rounded-3xl border border-bone-100/10 bg-ink-800/60 md:grid-cols-2 md:gap-10"
            >
              <div className={`relative aspect-[4/3] md:aspect-auto md:h-[360px] ${i % 2 === 1 ? "md:order-2" : ""}`}>
                <img src={s.img} alt={s.title} loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-ink-900/40 via-transparent to-transparent md:from-ink-900/30" />
              </div>
              <div className="p-6 sm:p-8 md:p-10">
                <p className="eyebrow">{s.eyebrow}</p>
                <h3 className="display mt-3 text-3xl sm:text-4xl">{s.title}</h3>
                <p className="mt-5 text-base text-bone-200/80 sm:text-lg">{s.body}</p>
                <Link to={s.to} className="btn-gold mt-7">
                  Explore <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
