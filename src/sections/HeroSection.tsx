import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import PolaroidCard from '@/components/PolaroidCard';
import { motion, useScroll, useTransform } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const polaroids = [
  { image: '/images/polaroid-1.jpg', caption: '3 cities in Japan', rotation: -3 },
  { image: '/images/polaroid-2.jpg', caption: '10 days', rotation: 1.5 },
  { image: '/images/polaroid-3.jpg', caption: 'gigabytes of photos', rotation: -1 },
  { image: '/images/polaroid-4.jpg', caption: 'eat ramen', rotation: 2.5 },
  { image: '/images/polaroid-5.jpg', caption: 'enjoy the vibe', rotation: -2 },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ['0vh', '30vh']);
  const titleY = useTransform(scrollYProgress, [0, 1], ['0vh', '50vh']);
  const polaroidsX = useTransform(scrollYProgress, [0, 1], ['0vw', '-40vw']);
  const videoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const polaroidsRef = useRef<HTMLDivElement>(null);
  const kimonoRef = useRef<HTMLImageElement>(null);
  const bookBtnRef = useRef<HTMLButtonElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Entrance timeline
    const tl = gsap.timeline({ delay: 0.2 });

    // Video fade in
    tl.from(videoRef.current, {
      opacity: 0,
      duration: 1.2,
      ease: 'power2.out',
    }, 0);

    // Title fade up
    tl.from(titleRef.current, {
      opacity: 0,
      y: 60,
      duration: 1.0,
      ease: 'power3.out',
    }, 0.3);

    // Polaroids cascade
    if (polaroidsRef.current) {
      tl.from(polaroidsRef.current.children, {
        opacity: 0,
        y: 80,
        duration: 0.7,
        ease: 'back.out(1.2)',
        stagger: 0.1,
      }, 0.6);
    }

    // Kimono figure
    tl.from(kimonoRef.current, {
      opacity: 0,
      x: 40,
      duration: 1.0,
      ease: 'power3.out',
    }, 0.8);

    // Book button
    tl.from(bookBtnRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, 1.0);

    // Social icons
    tl.from(socialsRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power3.out',
    }, 1.2);
  }, { scope: sectionRef });

  const scrollToContacts = () => {
    document.querySelector('#contacts')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Mobile Styles Wrapper to strictly isolate mobile tweaks */}
      <style>{`
        @media (max-width: 767px) {
          .hero-title-mobile {
            font-size: 16vw !important;
            top: 15vh !important;
          }
          .hero-polaroids-mobile {
            transform: scale(0.65) !important;
            transform-origin: bottom left !important;
            bottom: 8vh !important;
            left: 0 !important;
          }
          .hero-kimono-mobile {
            display: block !important;
            right: -30px !important;
            max-height: 55vh !important;
            opacity: 0.75 !important;
          }
          .hero-book-btn-mobile {
            display: block !important;
            right: auto !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            bottom: 6vh !important;
          }
        }
      `}</style>

      {/* Background Video */}
      <div ref={videoRef} className="absolute inset-0" style={{ zIndex: 0 }}>
        <motion.video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ y: videoY, willChange: 'transform' }}
          poster="/images/polaroid-1.jpg"
        >
          <source src="/images/hero-bg-video.mp4" type="video/mp4" />
        </motion.video>
      </div>

      {/* Dark Overlay */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: 'rgba(10,10,12,0.35)',
        }}
      />

      {/* Content */}
      <div
        className="relative w-full h-full"
        style={{ zIndex: 2 }}
      >
        {/* JAPAN Title */}
        <div ref={titleRef} className="absolute inset-0 pointer-events-none">
          <motion.h1
            className="absolute text-soft-cream font-extralight text-center uppercase select-none w-full hero-title-mobile"
            style={{
              y: titleY,
              willChange: 'transform',
              top: 'clamp(60px, 8vh, 100px)',
              fontSize: 'clamp(64px, 11vw, 162px)',
              letterSpacing: '-0.02em',
              lineHeight: 0.85,
              textShadow: '0 2px 40px rgba(0,0,0,0.4)',
            }}
          >
            JAPAN
          </motion.h1>
        </div>

        {/* Polaroid Strip */}
        <div ref={polaroidsRef} className="absolute w-full h-full pointer-events-none">
          <motion.div
            className="absolute flex items-end pointer-events-auto hero-polaroids-mobile"
            style={{
              x: polaroidsX,
              willChange: 'transform',
              bottom: 'clamp(40px, 6vh, 80px)',
              left: 'clamp(20px, 4vw, 48px)',
              gap: '-20px',
            }}
          >
            {polaroids.map((p, i) => (
              <div key={i} style={{ marginLeft: i > 0 ? '-20px' : '0', zIndex: polaroids.length - i }}>
                <PolaroidCard
                  image={p.image}
                  caption={p.caption}
                  rotation={p.rotation}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Kimono Figure */}
        <div ref={kimonoRef} className="absolute inset-0 pointer-events-none z-[1]">
          <img
            src="/images/hero-kimono-figure.png"
            alt="Woman in colorful kimono"
            className="absolute hidden md:block hero-kimono-mobile"
            style={{
              bottom: 0,
              right: 'clamp(40px, 8vw, 120px)',
              maxHeight: '75vh',
              width: 'auto',
              filter: 'drop-shadow(0 4px 30px rgba(0,0,0,0.3))',
            }}
          />
        </div>

        {/* Book Button (near kimono) */}
        <button
          ref={bookBtnRef}
          onClick={scrollToContacts}
          className="absolute hidden md:block group hero-book-btn-mobile z-10"
          style={{
            bottom: 'clamp(60px, 10vh, 120px)',
            right: 'clamp(314px, 35vw, 494px)',
          }}
          data-cursor="ring"
        >
          <span
            className="relative overflow-hidden inline-block border border-soft-cream text-soft-cream px-8 py-2.5 rounded-full text-[13px] font-medium tracking-[0.08em] transition-colors duration-300 group-hover:text-deep-night"
          >
            <span className="relative z-10">Book</span>
            <span className="absolute inset-0 bg-soft-cream scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300 ease-out" />
          </span>
        </button>

        {/* Social Icons (right edge) */}
        <div
          ref={socialsRef}
          className="absolute hidden lg:flex flex-col items-center gap-4"
          style={{
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          {/* Instagram */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9E978D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="hover:stroke-soft-cream hover:scale-110 transition-all duration-300 cursor-pointer">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="17.5" cy="6.5" r="1.5" fill="#9E978D" stroke="none" className="hover:fill-soft-cream" />
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
    </section>
  );
}
