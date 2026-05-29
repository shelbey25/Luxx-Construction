import { motion } from "framer-motion";
import {
  Compass,
  PenTool,
  ClipboardList,
  HardHat,
  Plug,
  Hammer,
  CloudLightning,
  Wrench,
} from "lucide-react";
import { PageHero } from "../components/PageHero";
import { CTASection } from "../components/CTASection";

const ITEMS = [
  { icon: Compass, title: "Planning & Preconstruction", body: "Strategic development of project scope, budget, and timeline before take-off." },
  { icon: PenTool, title: "Design & Build Delivery", body: "Combining design and expertise for a streamlined project delivery." },
  { icon: ClipboardList, title: "Project Management", body: "Oversight and coordination of all aspects of commercial construction." },
  { icon: HardHat, title: "Commercial Roofing", body: "New roofs and roof replacement designed for the Florida environment." },
  { icon: Plug, title: "MEP Systems", body: "Installation and upgrading of mechanical, electrical, and plumbing systems." },
  { icon: Hammer, title: "Remodels & Renovations", body: "Transformation of existing spaces according to each job’s specifications." },
  { icon: CloudLightning, title: "Storm Damage Restoration", body: "Remediation and rebuilding after floods, hurricanes, or severe weather." },
  { icon: Wrench, title: "Property Mgmt & Maintenance", body: "Recurring services that help commercial clients preserve their investment." },
];

export function CommercialPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", to: "/" }, { label: "Our Work", to: "/work" }, { label: "Commercial" }]}
        eyebrow="Commercial"
        title="Commercial"
        italic="construction."
        description="LUXX offers custom luxury solutions across every stage of your commercial building journey. We deliver world-class construction with your vision as the foundation for everything we do."
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80"
        imageAlt="Commercial interior"
      />

      <section className="relative bg-ink-900 py-16 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10">
          <p className="eyebrow">End-to-End Commercial Contracting</p>
          <h2 className="display mt-4 text-3xl sm:text-4xl md:text-5xl">
            Every stage handled by{" "}
            <span className="italic text-gold-300">one accountable team.</span>
          </h2>

          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-bone-100/10 bg-bone-100/5 sm:grid-cols-2 lg:grid-cols-4">
            {ITEMS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, delay: (i % 4) * 0.06 }}
                  className="group bg-ink-900 p-6 transition-colors duration-500 hover:bg-ink-800 sm:p-7"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/30 text-gold-300 group-hover:border-gold-300 group-hover:bg-gold-500/10">
                    <Icon size={18} />
                  </div>
                  <h3 className="mt-5 font-display text-xl text-bone-100">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-bone-300">{s.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        title="Interested in discussing a"
        italic="commercial project?"
        description="Speak to our team about your commercial construction opportunity — from planning through handover."
        ctaLabel="Make a Commercial Inquiry"
      />
    </>
  );
}
