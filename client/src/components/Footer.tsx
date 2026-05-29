import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative border-t border-bone-100/5 bg-ink-900 pb-10 pt-16 sm:pt-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:gap-12 sm:px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <Logo className="items-start" imageClassName="w-[112px] sm:w-[124px]" />
          <p className="mt-6 max-w-sm text-sm text-bone-300">
            Family owned. Florida built. Delivering luxury residential, commercial
            and consulting solutions across South Florida.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow">Menu</p>
          <ul className="mt-5 space-y-3 text-sm text-bone-200">
            <li><Link to="/" className="hover:text-gold-300">Home</Link></li>
            <li><Link to="/about" className="hover:text-gold-300">About</Link></li>
            <li><Link to="/work" className="hover:text-gold-300">Our Work</Link></li>
            <li><Link to="/contact" className="hover:text-gold-300">Contact</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="eyebrow">Expertise</p>
          <ul className="mt-5 space-y-3 text-sm text-bone-200">
            <li><Link to="/residential" className="hover:text-gold-300">Residential</Link></li>
            <li><Link to="/commercial" className="hover:text-gold-300">Commercial</Link></li>
            <li><Link to="/consulting" className="hover:text-gold-300">Consulting</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="eyebrow">Contact</p>
          <ul className="mt-5 space-y-3 text-sm text-bone-200">
            <li><a href="tel:+17727754908" className="hover:text-gold-300">+1 (772) 775-4908</a></li>
            <li><a href="mailto:info@luxxfl.com" className="hover:text-gold-300">info@luxxfl.com</a></li>
            <li className="text-bone-300">Ocean Breeze, FL</li>
            <li className="text-bone-300">Mon – Fri · 8 AM – 6 PM</li>
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
