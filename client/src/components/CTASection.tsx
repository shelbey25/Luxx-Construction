import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

type CTASectionProps = {
  eyebrow?: string;
  title: string;
  italic?: string;
  description?: string;
  ctaLabel?: string;
  ctaTo?: string;
};

export function CTASection({
  eyebrow = "Ready to Begin",
  title = "Let’s build something",
  italic = "extraordinary.",
  description,
  ctaLabel = "Schedule a Consultation",
  ctaTo = "/contact",
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-ink-800 py-20 sm:py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(200,167,101,0.12),transparent_55%)]"
      />
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-6">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="display mt-4 text-[34px] sm:text-4xl md:text-5xl">
          {title}{" "}
          {italic && <span className="italic text-gold-300">{italic}</span>}
        </h2>
        {description && (
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-bone-200/80 sm:text-lg">
            {description}
          </p>
        )}
        <div className="mt-8 flex justify-center">
          <Link to={ctaTo} className="btn-gold">
            {ctaLabel} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
