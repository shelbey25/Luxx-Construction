import { motion } from "framer-motion";
import { PageHero } from "../components/PageHero";
import { CTASection } from "../components/CTASection";

const INTERIORS = [
  { title: "Entryways", img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80" },
  { title: "Living Spaces", img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80" },
  { title: "Kitchens", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80" },
  { title: "Bedrooms", img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80" },
  { title: "Spacious Baths", img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=900&q=80" },
  { title: "& More", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80" },
];

const EXTERIORS = [
  { title: "LUXX Roofing — Our Specialty", img: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=900&q=80" },
  { title: "Outside Patios", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80" },
  { title: "Water Features", img: "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=900&q=80" },
];

const ADDITIONAL = [
  "Seamless Additions & Expansions",
  "Renovations & Remodels",
  "Storm Damage Restoration",
  "Property Damage Assessments",
  "Emergency Roof Service / Repairs",
  "Select Ongoing Services & Mgmt",
];

function Gallery({ heading, items }: { heading: string; items: { title: string; img: string }[] }) {
  return (
    <div>
      <h3 className="font-display text-2xl text-bone-100 sm:text-3xl">{heading}</h3>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: (i % 3) * 0.06 }}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-bone-100/10"
          >
            <img
              src={it.img}
              alt={it.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-[10px] uppercase tracking-luxe text-gold-300">Featured</p>
              <p className="mt-1 font-display text-xl text-bone-100">{it.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function ResidentialPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", to: "/" }, { label: "Our Work", to: "/work" }, { label: "Residential" }]}
        eyebrow="Residential"
        title="Residential"
        italic="construction."
        description="LUXX offers custom luxury solutions across every stage of your building journey. We deliver world-class construction with your vision as the foundation for everything we do."
        image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80"
        imageAlt="Luxury residential build"
      />

      <section className="relative bg-ink-900 py-16 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl space-y-16 px-5 sm:px-6 md:space-y-24 md:px-10">
          <Gallery heading="Custom-Luxury Interiors" items={INTERIORS} />
          <Gallery heading="Custom-Luxury Exteriors" items={EXTERIORS} />
        </div>
      </section>

      <section className="relative bg-ink-800 py-16 sm:py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 md:grid-cols-12 md:gap-16 md:px-10">
          <div className="md:col-span-5">
            <p className="eyebrow">Full Service</p>
            <h3 className="display mt-4 text-3xl sm:text-4xl">
              A full-service building contractor.{" "}
              <span className="italic text-gold-300">Roofing is our specialty.</span>
            </h3>
            <p className="mt-5 text-base leading-relaxed text-bone-200/80">
              LUXX Construction provides custom, high-end construction solutions across
              South Florida. Whatever the scope, we build it with care.
            </p>
          </div>
          <div className="md:col-span-7">
            <p className="eyebrow">Additional Services</p>
            <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {ADDITIONAL.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-3 rounded-xl border border-bone-100/10 bg-ink-900/60 p-4 text-sm text-bone-100"
                >
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-gold-500" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Let’s Build"
        title="Interested in discussing a"
        italic="residential project?"
        description="If you’d like to speak to a member of our team about a residential construction opportunity, please don’t hesitate to reach out."
        ctaLabel="Make a Residential Inquiry"
      />
    </>
  );
}
