import { Facebook, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-bone-100/5 bg-ink-900 pb-10 pt-16 sm:pt-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:gap-12 sm:px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <p className="font-display text-3xl text-bone-100">LUXX</p>
          <p className="mt-2 text-xs uppercase tracking-luxe text-gold-500">
            Construction
          </p>
          <p className="mt-6 max-w-sm text-sm text-bone-300">
            Family owned. Florida built. Delivering luxury residential, commercial
            and consulting solutions across South Florida.
          </p>
          <div className="mt-6 flex gap-3">
            <a aria-label="Facebook" href="#" className="rounded-full border border-bone-100/15 p-2 text-bone-200 hover:border-gold-500 hover:text-gold-300">
              <Facebook size={16} />
            </a>
            <a aria-label="Instagram" href="#" className="rounded-full border border-bone-100/15 p-2 text-bone-200 hover:border-gold-500 hover:text-gold-300">
              <Instagram size={16} />
            </a>
            <a aria-label="LinkedIn" href="#" className="rounded-full border border-bone-100/15 p-2 text-bone-200 hover:border-gold-500 hover:text-gold-300">
              <Linkedin size={16} />
            </a>
          </div>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow">Menu</p>
          <ul className="mt-5 space-y-3 text-sm text-bone-200">
            <li><a href="#top" className="hover:text-gold-300">Home</a></li>
            <li><a href="#services" className="hover:text-gold-300">Expertise</a></li>
            <li><a href="#about" className="hover:text-gold-300">About</a></li>
            <li><a href="#reviews" className="hover:text-gold-300">Reviews</a></li>
            <li><a href="#contact" className="hover:text-gold-300">Contact</a></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="eyebrow">Contact</p>
          <ul className="mt-5 space-y-3 text-sm text-bone-200">
            <li><a href="tel:+17727754908" className="hover:text-gold-300">+1 (772) 775-4908</a></li>
            <li><a href="mailto:info@luxxfl.com" className="hover:text-gold-300">info@luxxfl.com</a></li>
            <li className="text-bone-300">Ocean Breeze, FL</li>
            <li className="text-bone-300">Mon – Fri · 8:00 AM – 6:00 PM</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl px-5 sm:mt-16 sm:px-6 md:px-10">
        <div className="hairline" />
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-center text-[10px] uppercase tracking-luxe text-bone-400 sm:text-[11px] md:flex-row md:text-left">
          <p>© {new Date().getFullYear()} LUXX Construction · CBC #1268110</p>
          <p>Terms · Privacy · Accessibility</p>
        </div>
      </div>
    </footer>
  );
}
