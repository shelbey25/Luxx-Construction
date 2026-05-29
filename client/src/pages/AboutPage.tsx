import { motion } from "framer-motion";
import { Award, MessageCircle, Sparkles, Wand2 } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { CTASection } from "../components/CTASection";

const VALUES = [
  { icon: Award, title: "Quality", body: "We never compromise on quality — excellence is found in every detail." },
  { icon: Sparkles, title: "Innovation", body: "We never forget the fundamentals but we’re always ready to adapt." },
  { icon: MessageCircle, title: "Communication", body: "Clear and honest communication is the only way we work." },
  { icon: Wand2, title: "Personalization", body: "Every project is unique — our tailored approach exceeds expectations." },
];

export function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", to: "/" }, { label: "About" }]}
        eyebrow="Our Company"
        title="LUXX"
        italic="Construction."
        description="A boutique building firm specialized in the design & delivery of custom residential and commercial construction projects across South Florida."
        image="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80"
        imageAlt="LUXX team"
      />

      <section className="relative bg-ink-900 py-16 sm:py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 md:grid-cols-3 md:gap-10 md:px-10">
          <div>
            <p className="eyebrow">Our Company</p>
            <h2 className="display mt-3 text-3xl">A boutique firm.</h2>
            <p className="mt-5 text-base text-bone-200/80">
              LUXX is a boutique building firm specialized in the design & delivery
              of custom residential and commercial construction projects. We are a
              local, family-owned business, operating out of Ocean Breeze, FL —
              our team provides world-class expertise and the finest construction
              experience in the state.
            </p>
          </div>
          <div>
            <p className="eyebrow">Our Mission</p>
            <h2 className="display mt-3 text-3xl">Built to last.</h2>
            <p className="mt-5 text-base text-bone-200/80">
              To build exceptional spaces that bring our clients’ aspirations to
              life through quality craftsmanship, clear processes, and dedicated
              service — setting the standard for luxury construction in Florida.
            </p>
          </div>
          <div>
            <p className="eyebrow">Our Vision</p>
            <h2 className="display mt-3 text-3xl">Florida’s premier firm.</h2>
            <p className="mt-5 text-base text-bone-200/80">
              We are recognized as the premier luxury building firm of Florida.
              Our clients trust us with their most important projects, knowing
              that whatever they bring to us will be delivered with precision, by
              passionate builders, and withstand the test of time.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-ink-800 py-16 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10">
          <p className="eyebrow">What We Value</p>
          <h2 className="display mt-4 text-3xl sm:text-4xl md:text-5xl">
            Principles we{" "}
            <span className="italic text-gold-300">build by.</span>
          </h2>

          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-bone-100/10 bg-bone-100/5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, delay: (i % 4) * 0.06 }}
                  className="bg-ink-800 p-6 sm:p-7"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/30 text-gold-300">
                    <Icon size={18} />
                  </div>
                  <h3 className="mt-5 font-display text-xl text-bone-100">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-bone-300">{v.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Family Owned · CBC #1268110"
        title="Let’s build for you what others can"
        italic="only imagine."
        ctaLabel="Get in Touch"
      />
    </>
  );
}
