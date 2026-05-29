import { motion } from "framer-motion";
import { PageHero } from "../components/PageHero";
import { CTASection } from "../components/CTASection";

const REQUESTED = [
  { title: "Property Assessments", img: "https://images.unsplash.com/photo-1542361345-89e58247f2d5?auto=format&fit=crop&w=900&q=80" },
  { title: "Rapid Repair Estimates", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80" },
  { title: "Pre & Post-Storm Services", img: "https://images.unsplash.com/photo-1527482797697-8795b05a13b8?auto=format&fit=crop&w=900&q=80" },
];

const INDUSTRIES = [
  {
    title: "Insurance & Legal",
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
    bullets: [
      "Insurance Damage Assessments",
      "Expert Witness Testimony",
      "Construction Defect Analysis",
      "Construction Cost Analysis",
    ],
  },
  {
    title: "Real Estate",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    bullets: [
      "Pre-Listing Property Assessments",
      "Rapid-Repair Estimates (48 hrs)",
      "Renovation Feasibility Studies",
      "Pre-Purchase Property Inspection",
    ],
  },
  {
    title: "HOA & Condominium Management",
    img: "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1200&q=80",
    bullets: [
      "Building Reserve Studies",
      "Annual Property Assessment",
      "Capital Improvement Planning",
      "Vendor Performance Oversight",
    ],
  },
  {
    title: "Luxury Home & Property Owners",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    bullets: [
      "Annual, Semi-Annual & Quarterly Property Health Checks",
      "Storm Preparation & Recovery After Extreme Weather",
      "Seasonal Maintenance Programs",
      "Property Concierge Services",
    ],
  },
];

export function ConsultingPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", to: "/" }, { label: "Our Work", to: "/work" }, { label: "Consulting" }]}
        eyebrow="Consulting"
        title="Construction"
        italic="consulting."
        description="LUXX provides expert construction consulting to individuals, businesses, and professionals across Florida’s engineering, real estate, insurance, and legal industries."
        image="https://images.unsplash.com/photo-1573164574511-73c773193279?auto=format&fit=crop&w=1400&q=80"
        imageAlt="Consulting"
      />

      <section className="relative bg-ink-900 py-16 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10">
          <p className="eyebrow">Most Requested Services</p>
          <h2 className="display mt-4 text-3xl sm:text-4xl md:text-5xl">
            Independent expertise.{" "}
            <span className="italic text-gold-300">Rapid turnaround.</span>
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {REQUESTED.map((it, i) => (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-bone-100/10"
              >
                <img src={it.img} alt={it.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-[10px] uppercase tracking-luxe text-gold-300">Service</p>
                  <p className="mt-1 font-display text-xl text-bone-100">{it.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-ink-800 py-16 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10">
          <p className="eyebrow">Services by Industry</p>
          <h2 className="display mt-4 text-3xl sm:text-4xl md:text-5xl">
            Tailored to <span className="italic text-gold-300">your industry.</span>
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            {INDUSTRIES.map((ind, i) => (
              <motion.div
                key={ind.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: (i % 2) * 0.06 }}
                className="overflow-hidden rounded-2xl border border-bone-100/10 bg-ink-900/60"
              >
                <div className="relative h-48 overflow-hidden sm:h-56">
                  <img src={ind.img} alt={ind.title} loading="lazy" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 to-transparent" />
                  <h3 className="absolute bottom-4 left-5 right-5 font-display text-2xl text-bone-100">
                    {ind.title}
                  </h3>
                </div>
                <ul className="space-y-3 p-6 text-sm text-bone-200">
                  {ind.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-gold-500" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Interested in discussing a"
        italic="consulting project?"
        description="Connect with our consulting team for strategic expertise across insurance, real estate, HOA, and luxury property ownership."
        ctaLabel="Make a Consulting Inquiry"
      />
    </>
  );
}
