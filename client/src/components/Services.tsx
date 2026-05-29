import { motion } from "framer-motion";
import { Hammer, Building2, LineChart, Home, CloudLightning, Wrench } from "lucide-react";

const ITEMS = [
  {
    icon: Home,
    title: "Residential",
    body: "Exceptional living spaces that reflect your vision — from full custom builds to elevated renovations.",
  },
  {
    icon: Building2,
    title: "Commercial",
    body: "Commercial environments engineered to elevate your business with precision and longevity.",
  },
  {
    icon: LineChart,
    title: "Consulting",
    body: "Strategic expertise to optimize budgets, timelines and outcomes across every project stage.",
  },
  {
    icon: Hammer,
    title: "Luxury Design & Build",
    body: "End-to-end design-build for high-touch projects where finish and detail are everything.",
  },
  {
    icon: CloudLightning,
    title: "Storm Restoration",
    body: "Emergency roofing, repairs and full storm restoration with insurance-grade estimating.",
  },
  {
    icon: Wrench,
    title: "3rd Party Assessments",
    body: "Independent expert assessments and property damage estimating you can stand behind.",
  },
];

export function Services() {
  return (
    <section id="services" className="relative bg-ink-900 py-20 sm:py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">Expertise</p>
            <h2 className="display mt-4 text-[34px] sm:text-4xl md:text-6xl">
              Expert services & <span className="italic text-gold-300">custom solutions</span>{" "}
              across every stage of South Florida construction.
            </h2>
          </div>
          <a href="#contact" className="btn-ghost shrink-0">Request a Quote</a>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-bone-100/10 bg-bone-100/5 sm:grid-cols-2 md:mt-16 md:grid-cols-3">
          {ITEMS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
                className="group relative bg-ink-900 p-6 transition-colors duration-500 hover:bg-ink-800 sm:p-8"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/30 text-gold-300 transition-all duration-500 group-hover:border-gold-300 group-hover:bg-gold-500/10 sm:h-12 sm:w-12">
                  <Icon size={20} />
                </div>
                <h3 className="mt-5 font-display text-xl text-bone-100 sm:mt-6 sm:text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-bone-300">{s.body}</p>
                <div className="mt-6 h-px w-10 bg-gold-500/60 transition-all duration-500 group-hover:w-20" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
