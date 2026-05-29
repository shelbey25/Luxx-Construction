import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const LINKS = [
  { href: "#services", label: "Expertise" },
  { href: "#about", label: "About" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-bone-100/5 bg-ink-900/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 sm:py-5 md:px-10">
        <a href="#top" className="group flex items-center gap-3">
          <Logo compact />
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs uppercase tracking-[0.22em] text-bone-200/80 transition-colors hover:text-gold-300"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a href="#contact" className="btn-gold">Schedule Consultation</a>
        </div>

        <button
          aria-label="Menu"
          className="rounded-full border border-bone-100/15 p-2 text-bone-100 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-bone-100/5 bg-ink-900/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm uppercase tracking-[0.22em] text-bone-200 hover:bg-ink-700 hover:text-gold-300"
                >
                  {l.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="btn-gold mt-4">
                Schedule Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
