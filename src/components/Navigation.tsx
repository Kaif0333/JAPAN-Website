import { useEffect, useRef, useState } from 'react';
import { Globe, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Included', href: '#included' },
  { label: 'Contacts', href: '#contacts' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const vh80 = window.innerHeight * 0.8;
      setScrolled(window.scrollY > vh80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-[100] h-16 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? 'bg-[rgba(10,10,12,0.85)] backdrop-blur-[12px]'
            : 'bg-transparent'
        }`}
        style={{ padding: '0 clamp(20px, 4vw, 48px)' }}
      >
        {/* Brand */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group"
          data-cursor="ring"
        >
          <Globe className="w-[18px] h-[18px] text-soft-cream" />
          <span
            className="text-[13px] font-normal tracking-[0.12em] uppercase text-soft-cream"
          >
            JAPAN TOURS
          </span>
        </button>

        {/* Center Links — Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="relative text-[13px] font-normal tracking-[0.12em] uppercase text-warm-muted hover:text-soft-cream transition-colors duration-300 group"
              data-cursor="ring"
            >
              {link.label}
              <span className="absolute bottom-[-4px] left-0 w-full h-[1px] bg-accent-lime scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
            </button>
          ))}
        </div>

        {/* Right — Book Button (Desktop) */}
        <button
          onClick={() => scrollTo('#contacts')}
          className="hidden md:block relative overflow-hidden border border-soft-cream text-soft-cream px-6 py-2 rounded-full text-[13px] font-medium tracking-[0.08em] group hover:text-deep-night transition-colors duration-300"
          data-cursor="ring"
        >
          <span className="relative z-10">Book</span>
          <span className="absolute inset-0 bg-soft-cream scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300 ease-out" />
        </button>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-soft-cream"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-cursor="ring"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[99] bg-deep-night flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-[24px] font-light tracking-[0.12em] uppercase text-soft-cream"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#contacts')}
            className="mt-4 border border-soft-cream text-soft-cream px-8 py-3 rounded-full text-[16px] font-medium tracking-[0.08em]"
          >
            Book
          </button>
        </div>
      )}
    </>
  );
}
