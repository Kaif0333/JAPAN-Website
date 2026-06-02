import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Globe, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Included', href: '#included' },
  { label: 'Contacts', href: '#contacts' },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);

  useGSAP(() => {
    // Background scale
    gsap.from(bgRef.current, {
      scale: 1.03,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
      },
    });

    // Form panel entrance
    gsap.from(formRef.current, {
      opacity: 0,
      x: -30,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
      },
    });

    // Background parallax
    gsap.to(bgRef.current, {
      y: -40,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, { scope: sectionRef });

  const validate = () => {
    const newErrors: Record<string, boolean> = {};
    if (!name || name.length < 2) newErrors.name = true;
    if (!phone || phone.length < 5) newErrors.phone = true;
    setErrors(newErrors);

    // Shake animation on invalid fields
    Object.keys(newErrors).forEach((key) => {
      const el = document.getElementById(`field-${key}`);
      if (el) {
        const tl = gsap.timeline();
        tl.to(el, { x: -4, duration: 0.05 });
        tl.to(el, { x: 4, duration: 0.05 });
        tl.to(el, { x: -4, duration: 0.05 });
        tl.to(el, { x: 4, duration: 0.05 });
        tl.to(el, { x: 0, duration: 0.05 });
      }
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setName('');
        setPhone('');
        setComment('');
      }, 2000);
    }
  };

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const inputClasses = (field: string) =>
    `w-full bg-transparent border-0 border-b ${
      errors[field] ? 'border-[#E57373]' : 'border-[rgba(255,255,255,0.3)]'
    } text-soft-cream py-3 outline-none transition-colors duration-300 focus:border-accent-lime placeholder:text-warm-muted`;

  return (
    <section
      ref={sectionRef}
      id="contacts"
      className="relative min-h-screen overflow-hidden flex flex-col"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/contact-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: 'linear-gradient(to right, rgba(10,10,12,0.5) 0%, rgba(10,10,12,0.15) 50%, transparent 80%)',
        }}
      />

      {/* Content */}
      <div
        className="relative flex-1 flex items-center"
        style={{
          zIndex: 2,
          padding: 'clamp(80px, 10vh, 120px) clamp(20px, 4vw, 48px)',
        }}
      >
        {/* Form Panel */}
        <div
          ref={formRef}
          className="w-full max-w-[420px] rounded-[16px]"
          style={{
            background: 'rgba(255,255,255,0.10)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.15)',
            padding: 'clamp(32px, 4vw, 48px)',
          }}
        >
          <h3
            className="text-soft-cream font-normal"
            style={{
              fontSize: 'clamp(20px, 2.5vw, 26px)',
              lineHeight: 1.3,
            }}
          >
            Want to join us,
            <br />
            but still have questions?
          </h3>

          <p
            className="mt-2 mb-7 text-warm-muted font-medium uppercase"
            style={{
              fontSize: 'clamp(11px, 0.9vw, 13px)',
              letterSpacing: '0.15em',
            }}
          >
            Leave a request
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-0">
            <div id="field-name" className="mb-6">
              <label
                className="block text-warm-muted font-medium uppercase mb-2"
                style={{
                  fontSize: 'clamp(11px, 0.9vw, 13px)',
                  letterSpacing: '0.15em',
                }}
              >
                Your name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setErrors((prev) => ({ ...prev, name: false })); }}
                placeholder="Your name"
                className={inputClasses('name')}
              />
            </div>

            <div id="field-phone" className="mb-6">
              <label
                className="block text-warm-muted font-medium uppercase mb-2"
                style={{
                  fontSize: 'clamp(11px, 0.9vw, 13px)',
                  letterSpacing: '0.15em',
                }}
              >
                Phone number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => { setPhone(e.target.value); setErrors((prev) => ({ ...prev, phone: false })); }}
                placeholder="Phone number"
                className={inputClasses('phone')}
              />
            </div>

            <div id="field-comment" className="mb-8">
              <label
                className="block text-warm-muted font-medium uppercase mb-2"
                style={{
                  fontSize: 'clamp(11px, 0.9vw, 13px)',
                  letterSpacing: '0.15em',
                }}
              >
                Comment
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Comment"
                rows={3}
                className={`${inputClasses('comment')} resize-none`}
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full py-3.5 text-[13px] font-medium tracking-[0.08em] transition-all duration-300 flex items-center justify-center gap-2"
              style={{
                backgroundColor: sent ? '#D4E157' : '#F5F2ED',
                color: '#0A0A0C',
              }}
              onMouseEnter={(e) => {
                if (!sent) (e.currentTarget as HTMLElement).style.backgroundColor = '#D4E157';
              }}
              onMouseLeave={(e) => {
                if (!sent) (e.currentTarget as HTMLElement).style.backgroundColor = '#F5F2ED';
              }}
              data-cursor="ring"
            >
              {sent ? (
                <>
                  <Check size={16} />
                  Sent!
                </>
              ) : (
                'Send'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="relative w-full"
        style={{
          zIndex: 2,
          padding: '24px clamp(20px, 4vw, 48px)',
          borderTop: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-soft-cream" />
            <span
              className="text-soft-cream font-normal uppercase"
              style={{
                fontSize: '12px',
                letterSpacing: '0.10em',
              }}
            >
              JAPAN TOURS
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-1 flex-wrap justify-center">
            {footerLinks.map((link, i) => (
              <span key={link.label} className="flex items-center">
                <button
                  onClick={() => scrollTo(link.href)}
                  className="text-warm-muted hover:text-soft-cream transition-colors duration-300 uppercase"
                  style={{
                    fontSize: '12px',
                    letterSpacing: '0.10em',
                  }}
                  data-cursor="ring"
                >
                  {link.label}
                </button>
                {i < footerLinks.length - 1 && (
                  <span className="text-warm-muted mx-2">·</span>
                )}
              </span>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {/* Instagram */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9E978D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="hover:stroke-soft-cream hover:scale-110 transition-all duration-300 cursor-pointer">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="#9E978D" stroke="none" />
            </svg>
            {/* Facebook */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9E978D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="hover:stroke-soft-cream hover:scale-110 transition-all duration-300 cursor-pointer">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
            {/* Telegram */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9E978D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="hover:stroke-soft-cream hover:scale-110 transition-all duration-300 cursor-pointer">
              <path d="M21.2 2L2.5 10.2c-.7.3-.7 1.1 0 1.4l4.8 1.8 1.8 5.6c.2.5 1 .7 1.4.2l2.5-2.5 4.9 3.6c.5.4 1.2.1 1.3-.5L22.5 3c.1-.6-.5-1.1-1-.9l-.3.9z" />
              <path d="M9 14l5-4" />
            </svg>
          </div>
        </div>
      </footer>
    </section>
  );
}
